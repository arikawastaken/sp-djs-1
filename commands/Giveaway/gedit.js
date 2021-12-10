const { Client, CommandInteraction, Permissions, MessageEmbed } = require("discord.js");
const { color, errorcolor, avatar } = require('../../configs/client.json');
const ms = require('ms');

module.exports = {
    name: "gedit",
    description: "Edits A Giveaway With Its Id!",
    type: 'CHAT_INPUT',
    options: [
      {
        name: "prize",
        description: "New Prize For Giveaway!",
        type: "STRING",
        required: true
      },
         {
        name: "id",
        description: "Id Of Giveaway To Edit!",
        type: "STRING",
        required: true
      },
   {
        name: "winners",
        description: "New Winners For Giveaway!",
        type: "INTEGER",
        required: false
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
        const id = interaction.options.getString('id');
        const winnerCount = interaction.options.getInteger('winners') || '1';
        const prize = interaction.options.getString('prize');

          client.giveawaysManager.edit(id, {
            addTime: 5000,
            newWinnerCount: winnerCount,
            newPrize: prize
        }).then(() => {
            interaction.deleteReply();
        }).catch((err) => {
            interaction.channel.send(`An error has occurred, please check and try again.\n\`${err}\``);
        });
            
        } else {
            client.error(interaction, "You Dont Have Permission To Use This Command! `MANAGE_GUILD`");
        }
    },
};
