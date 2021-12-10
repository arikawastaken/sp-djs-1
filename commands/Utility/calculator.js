const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { color, errorcolor, avatar } = require('../../configs/client.json');
const simplydjs = require("simply-djs");

module.exports = {
    name: "calculator",
    description: "Shows A Real Calculator!",
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
      simplydjs.calculator(interaction, {
         slash: true,
         embedColor: color,
         credit: false
});
    },
};
