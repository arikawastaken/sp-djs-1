const { Client, CommandInteraction, Permissions, MessageEmbed } = require("discord.js");
const { color, errorcolor, avatar } = require('../../configs/client.json');

module.exports = {
    name: "kick",
    description: "Kicks The Mentioned User!",
    type: 'CHAT_INPUT',
    options: [
        {
            name: 'target',
            description: 'Mention The User To Kick!',
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
        if (interaction.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
            if (interaction.guild.me.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
            const target = interaction.options.getMember('target');
            const reason = interaction.options.getString('reason') || 'No Reason Provided!';

            if (target.user.id === interaction.user.id) return interaction.followUp(`You Cannot Kick Yourself!`);
            if (target.user.id === interaction.guild.me.id) return interaction.followUp(`You Cannot Kick Me xD!`);
            if (target.roles.highest.position > interaction.member.roles.highest.position) return interaction.followUp({ content: `You Cannot Kick ${target.user.tag} Because They Have Highest Role Then You!` });
            const sendUser = new MessageEmbed()
            .setColor(color)
            .setDescription(`You Have Been Kicked From ${interaction.guild.name}! \nReason: ${reason}`)
            try {
              await target.send({ embeds: [sendUser] });
            } catch (e) {
              return;
            }
            target.kick(reason);

            const embed = new MessageEmbed()
            .setColor(color)
            .setTitle('Member Kicked')
            .setDescription(`${target.user.tag} Has Been Kicked! \nReason: ${reason}`)
            .setThumbnail(avatar)
            .setFooter(`Gadget - Moderation`)
        interaction.followUp({
            embeds: [embed]
        });

        client.modlogs({
            Member: target.user.tag,
            Action: 'Member Kicked',
            Color: color,
            Reason: reason,
            Moderator: interaction.user.tag
        }, interaction);
    } else {
        client.error(interaction, "I Dont Have Permission To Use This Command! `KICK_MEMBERS`");
    }
        } else {
             client.error(interaction, "You Dont Have Permission To Use This Command! `KICK_MEMBERS`");
        }
    },
};
