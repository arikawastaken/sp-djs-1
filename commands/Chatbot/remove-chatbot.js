const { Client, CommandInteraction, Permissions, MessageEmbed } = require("discord.js");
const { color, errorcolor, avatar } = require('../../configs/client.json');
const Schema = require('../../models/chatbot.js');

module.exports = {
    name: "remove-chatbot",
    description: "Disables Chatbot In This Server!",
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
                if (!data) return interaction.followUp(`Chatbot Is Not Setup In This Server!`);
                if (data) data.delete();
                const embed = new MessageEmbed()
                .setColor(color)
                .setTitle('Disabled Chatbot')
                .setDescription(`Successfully Disabled Chatbot In This Server!`)
                .setFooter('Gadget - Logging System')
                .setThumbnail(avatar)
                interaction.followUp({ embeds: [embed] });
            });
        } else {
            const noperms = new MessageEmbed()
            .setColor(errorcolor)
            .setTitle('Error')
            .setDescription(`You Don't Have Permissions To Execute This Command \`MANAGE_GUILD\`!`)
            .setFooter('Gadget - Logging System')
        interaction.followUp({
            embeds: [noperms]
        });
        }
    },
};
