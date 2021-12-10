const { Client, CommandInteraction, Permissions, MessageEmbed } = require("discord.js");
const { color, errorcolor, avatar } = require('../../configs/client.json');
const db = require('../../models/warndb');

module.exports = {
    name: "clear-warns",
    description: "Clears Warns Of Specified Member!",
    type: 'CHAT_INPUT',
    options: [
      {
        name: 'member',
        description: 'Clear All Warns Of ?',
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
              const user = interaction.options.getMember('member');
                db.findOne({
            guild: interaction.guild.id,
            user: user.user.id
        }, async (err, data) => {
            if (err) throw err;
            if (data) {
                await db.findOneAndDelete({
                    user: user.user.id,
                    guild: interaction.guild.id
                })
                const warnEmbed = new MessageEmbed()
                .setTitle(`Cleared All Warnings`)
                .setDescription(`Cleared All Warnings From ${user}!`)
                .setColor(color)
                .setThumbnail(avatar)
                .setFooter(`Gadget - Remove All Warns`)
                interaction.followUp({ embeds: [warnEmbed] });
            } else {
                interaction.followUp('This user does not have any warns in this server!');
            }
        })

          client.modlogs({
            Member: user.user.tag,
            Action: 'Member Warns Removed',
            Color: color,
            Reason: 'No Reason Provided',
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
