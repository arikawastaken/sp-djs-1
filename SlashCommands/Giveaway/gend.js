const { Client, CommandInteraction, Permissions, MessageEmbed } = require("discord.js");
const { color, errorcolor, avatar } = require('../../configs/client.json');
const ms = require('ms');

module.exports = {
    name: "gend",
    description: "Ends A Giveaway With Its Id!",
    type: 'CHAT_INPUT',
    options: [
      {
        name: "id",
        description: "Message ID Of Giveaway To End!",
        type: "STRING",
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
        const messageId = interaction.options.getString('id');
        client.giveawaysManager.end(messageId).then(() => {
            interaction.deleteReply();
        }).catch((err) => {
            interaction.followUp(err);
        });  
        } else {
           client.error(interaction, "You Dont Have Permission To Use This Command! `MANAGE_GUILD`");
        }
    },
};
