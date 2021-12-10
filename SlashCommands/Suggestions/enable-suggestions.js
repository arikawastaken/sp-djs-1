const { Client, CommandInteraction, Permissions, MessageEmbed } = require("discord.js");
const { color, errorcolor, avatar } = require('../../configs/client.json');
const Schema = require('../../models/suggest.js');

module.exports = {
    name: "enable-suggestions",
    description: "Enables Suggestions System On This Server!",
    type: 'CHAT_INPUT',
    options: [
        {
            name: 'channel',
            description: 'Mention A Channel For Suggestions!',
            type: 'CHANNEL',
            required: true,
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
            const channel = interaction.options.getChannel('channel')
        
            Schema.findOne({
                Guild: interaction.guild.id
            }, async(err, data) => {
                if (data) data.delete();
                new Schema({
                    Guild: interaction.guild.id,
                    Channel: channel.id,
                }).save();
                const embed = new MessageEmbed()
                .setColor(color)
                .setTitle('Suggestions Channel')
                .setDescription(`Successfully Set ${channel} As Suggestions Channel!`)
                .setFooter('Gadget - Suggestions System')
                interaction.followUp({ embeds: [embed] });
            });
        } else {
client.error(interaction, "You Dont Have Permission To Use This Command! `MANAGE_GUILD`");
        }
    },
};
