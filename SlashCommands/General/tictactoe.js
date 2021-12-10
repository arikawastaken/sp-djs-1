const { Client, CommandInteraction } = require("discord.js");
const { color, errorcolor, avatar } = require('../../configs/client.json');
const simplydjs = require("simply-djs");

module.exports = {
    name: "tictactoe",
    description: "Let You Play TicTacToe With A Member!",
    type: 'CHAT_INPUT',
    options: [
      {
        name: 'user',
        type: 'USER',
        description: 'You Will Play With ?',
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
simplydjs.tictactoe(interaction, {
  slash: true,
  embedColor: color,
  credit: false,

  // Slash Options
  userSlash: "user" // User Slash Option Name
});
    },
};
