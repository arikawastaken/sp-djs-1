const { Client, CommandInteraction, Permissions, MessageEmbed } = require("discord.js");
const { color, errorcolor, avatar } = require('../../configs/client.json');

module.exports = {
    name: "unmute",
    description: "Unmutes The Mentioned User!",
    type: 'CHAT_INPUT',
    options: [
      {
        name: 'member',
        description: 'Mention A User To Unmute!',
        type: 'USER',
        required: true
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
                const muteRole = interaction.guild.roles.cache.find(role => role.name === 'muted')

                try {
                  muteUser.roles.remove(muteRole.id);
                } catch (error) {
                  interaction.followUp(`Something Went Worng... ${error}`)
                }
                const muteEmbed = new MessageEmbed()
                .setTitle('Member Unmuted')
                .setDescription(`${muteUser} Have Been Unmuted!`)
                .setColor(color)
                .setThumbnail(avatar)
                .setFooter(`Gadget - Unmute User`)

                interaction.followUp({ embeds: [muteEmbed] });

          client.modlogs({
            Member: muteUser.user.tag,
            Action: 'Member Unmuted',
            Color: color,
            Reason: 'No Reason Provided!',
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
