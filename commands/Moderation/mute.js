const { Client, CommandInteraction, Permissions, MessageEmbed } = require("discord.js");
const { color, errorcolor, avatar } = require('../../configs/client.json');

module.exports = {
    name: "mute",
    description: "Mutes The Mentioned User!",
    type: 'CHAT_INPUT',
    options: [
      {
        name: 'member',
        description: 'Mention A User To Mute!',
        type: 'USER',
        required: true
      },
      {
        name: 'reason',
        description: 'Reason For Mute The User!',
        type: 'STRING',
        required: false
      }
    ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        if (interaction.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) {
            if (interaction.guild.me.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) {
                const muteUser = interaction.options.getMember('member');
                const reason = interaction.options.getString('reason') || 'No Reason Provided!';
                const muteRole = interaction.guild.roles.cache.find(role => role.name === 'muted')

                if (muteUser.user.id === interaction.user.id) return interaction.followUp(`You Cannot Mute Yourself!`);
                if (muteUser.user.id === client.user.id) return interaction.followUp(`You Cannot Mute Me!`);
                if (muteUser.roles.highest.position > interaction.member.roles.highest.position) return interaction.followUp({ content: `You Cannot Mute ${muteUser.user.tag} Because They Have Highest Role Then You!` });
                if (!muteRole) {
                  try {
                    await interaction.guild.roles.create({ name: 'muted', permissions: [Permissions.FLAGS.VIEW_CHANNEL] });
                  } catch (e) {
                    interaction.followUp(`Something Went Worng... ${e}`);
                  }
                }
                let role2 = interaction.guild.roles.cache.find(role => role.name === 'muted');
                if (muteUser.roles.cache.has(role2)) return interaction.reply('They Are Already Muted! use `/unmute` To Unmute Them!');

                await muteUser.roles.add(role2);
                const muteEmbed = new MessageEmbed()
                .setTitle('Member Muted')
                .setDescription(`${muteUser} Have Been Muted! \nReason: ${reason}`)
                .setColor(color)
                .setThumbnail(avatar)
                .setFooter(`Gadget - Mute User`)

                interaction.followUp({ embeds: [muteEmbed] });

          client.modlogs({
            Member: muteUser.user.tag,
            Action: 'Member Muted',
            Color: color,
            Reason: reason,
            Moderator: interaction.user.tag
        }, interaction);
    } else {
client.error(interaction, "I Dont Have Permission To Use This Command! `MANAGE_GUILD`");
    }
        } else {
client.error(interaction, "You Dont Have Permission To Use This Command! `MANAGE_GUILD`");
        }
    },
};
