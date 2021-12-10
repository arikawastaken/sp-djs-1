const { Client, CommandInteraction, Permissions, MessageEmbed } = require("discord.js");
const { color, errorcolor, avatar } = require('../../configs/client.json');
const schema = require('../../models/autorole.js')

module.exports = {
    name: "remove-autorole",
    description: "Disables Autorole In This Server!",
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        if (interaction.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) {
            if (interaction.guild.me.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) {
                schema.findOne({
            guild: interaction.guild.id
        }, async (err, data) => {
            if (err) throw err
            if (data) {
                data.delete();
            } else {
              interaction.followUp(`Autorole Is Not Setup On This Server!`);
            }
          const saveEmbed = new MessageEmbed()
            .setColor(color)
            .setTitle('Removed Autorole')
            .setDescription(`Successfully Disabled Autorole In This Server!`)
            .setThumbnail(avatar)
            .setFooter('Gadget - Autorole')
        interaction.followUp({
            embeds: [saveEmbed]
        });
            })
    } else {
        const noperm = new MessageEmbed()
            .setColor(errorcolor)
            .setTitle('Error')
            .setDescription(`I Don't Have Permissions To Execute This Command \`MANAGE_GUILD\`!`)
            .setFooter('Gadget - Error')
        interaction.followUp({
            embeds: [noperm]
        });
    }
        } else {
client.error(interaction, "You Dont Have Permission To Use This Command! `MANAGE_GUILD`");
        }
    },
};
