const { Client, CommandInteraction, Permissions, MessageEmbed } = require("discord.js");
const { color, errorcolor, avatar } = require('../../configs/client.json');
const ms = require('ms');

module.exports = {
    name: "gstart",
    description: "Starts A Giveaway In The Specified/Current Channel!",
    type: 'CHAT_INPUT',
    options: [
      {
        name: "prize",
        description: "Prize For Giveaway!",
        type: "STRING",
        required: true
      },
  {
        name: "duration",
        description: "Duration For Giveaway!",
        type: "STRING",
        required: true
      },
   {
        name: "winners",
        description: "Winners For Giveaway!",
        type: "INTEGER",
        required: true
      },
   {
        name: "channel",
        description: "Channel For Giveaway!",
        type: "CHANNEL",
        required: false,
      },
    ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        if (interaction.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) {
             const duration = interaction.options.getString('duration');
        const winnerCount = interaction.options.getInteger('winners');
        const prize = interaction.options.getString('prize');
          
        const channel = interaction.options.getChannel('channel') || interaction.channel;    client.giveawaysManager.start(channel, {
            duration: ms(duration),
            winnerCount,
            prize,
            lastChance: {
            enabled: true,
            content: '⚠️ **LAST CHANCE TO ENTER !** ⚠️',
            threshold: 5000,
            embedColor: '#FF0000'
    }
        });
        interaction.followUp("<a:giveaways:906904998108094475> GIVEAWAY <a:giveaways:906904998108094475>")
            
        } else {
            client.error(interaction, "You Dont Have Permission To Use This Command! `MANAGE_GUILD`");
        }
    },
};
