const { Client, CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { color, errorcolor, avatar } = require('../../configs/client.json');
const moment = require("moment");
const axios = require("axios");

module.exports = {
    name: "server-user",
    description: "Shows Current Avatar Of A User In This Server!",
    type: 'CHAT_INPUT',
    options: [
      {
        type: "SUB_COMMAND",
        name: "avatar",
        description: "Shows Current Avatar Of A User In This Server!"
      }
    ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
      
    },
};
