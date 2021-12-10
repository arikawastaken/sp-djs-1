const { Client, CommandInteraction, Permissions, MessageEmbed, Message } = require("discord.js");
const { color, errorcolor, avatar } = require('../../configs/client.json');

module.exports = {
    name: "ban",
    description: "Bans The Mentioned User!",
    type: 'CHAT_INPUT',
    options: [
        {
            name: 'target',
            description: 'Mention The User To Ban!',
            type: 'USER',
            required: true,
        },
        {
            name: 'reason',
            description: 'Provide A Reason! (Optional)',
            type: 'STRING',
            required: false,
        }
    ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        if (interaction.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
            if (interaction.guild.me.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
            const target = interaction.options.getMember('target');
            const reason = interaction.options.getString('reason') || 'No Reason Provided!';

            if (target.user.id === interaction.user.id) return interaction.followUp(`You Cannot Ban Yourself!`);
            if (target.user.id === interaction.guild.me.id) return interaction.followUp(`You Cannot Ban Me xD!`);
            if (target.roles.highest.position > interaction.member.roles.highest.position) return interaction.followUp({ content: `You Cannot Ban ${target.user.tag} Because They Have Highest Role Then You!` });
            const sendUser = new MessageEmbed()
            .setColor(color)
            .setDescription(`You Have Been Banned From ${interaction.guild.name}! \nReason: ${reason}`)

            try {
              await target.send({ embeds: [sendUser] });
            } catch (e) {
              return;
            }
            target.ban({ reason });

            const embed = new MessageEmbed()
            .setColor(color)
            .setTitle('Member Banned')
            .setDescription(`${target.user.tag} Has Been Banned! \nReason: ${reason}`)
            .setThumbnail(avatar)
            .setFooter(`Gadget - Moderation`)
        interaction.followUp({
            embeds: [embed]
        });

        client.modlogs({
            Member: target.user.tag,
            Action: 'Member Banned',
            Color: color,
            Reason: reason,
            Moderator: interaction.user.tag
        }, interaction);
    } else {
          client.error(interaction, "I Dont Have Permission To Use This Command! `BAN_MEMBERS`");
    }
        } else {
            client.error(interaction, "You Dont Have Permission To Use This Command! `BAN_MEMBERS`");
        }
    },
};
