const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { color, errorcolor, avatar } = require('../../configs/client.json');

module.exports = {
    name: "timedif",
    description: "Shows Time Differnce Between Two Messages!",
    type: 'CHAT_INPUT',
    options: [
      {
        name: 'id',
        description: 'Id Of First Message ?',
        type: 'STRING',
        required: true
      },
      {
        name: 'id2',
        description: 'Id Of Second Message ?',
        type: 'STRING',
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
        const id = interaction.options.getString('id');
        const id2 = interaction.options.getString('id2');

        interaction.followUp('soon')
    },
};
