const { Client, CommandInteraction, Permissions, MessageEmbed } = require("discord.js");
const { color, errorcolor, avatar } = require('../../configs/client.json');
const Schema = require('../../models/modlogs.js');

module.exports = {
    name: "remove-modlogs",
    description: "Disables Modlogs In This Server!",
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {        
        if (interaction.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) {
        
            Schema.findOne({
                Guild: interaction.guild.id
            }, async(err, data) => {
                if (!data) return interaction.followUp(`Modlogs Is Not Setup In This Server!`);
                if (data) data.delete();
                const embed = new MessageEmbed()
                .setColor(color)
                .setTitle('Removed Modlogs')
                .setDescription(`Successfully Disabled Modlogs In This Server!`)
                .setFooter('Gadget - Logging System')
                .setThumbnail(avatar)
                interaction.followUp({ embeds: [embed] });
            });
        } else {
 client.error(interaction, "You Dont Have Permission To Use This Command! `MANAGE_GUILD`");
        }
    },
};
