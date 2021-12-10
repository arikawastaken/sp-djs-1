const { Client, CommandInteraction, MessageAttachment } = require("discord.js");
const { color, errorcolor, avatar } = require('../../configs/client.json');
const Schema = require('../../models/suggest.js');
const simplydjs = require('simply-djs');

module.exports = {
    name: "suggest",
    description: "Suggest Something To The Server!",
    type: 'CHAT_INPUT',
    options: [
      {
        name: 'suggestion',
        description: 'What Do You Wanna Suggest ?',
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
      Schema.findOne({
                Guild: interaction.guild.id
            }, async(err, data) => {
    if (!data) {
      interaction.followUp("Suggestions System Is Not Enabled On This Server!");
    }
        if (data) {
    if (!interaction.guild.channels.cache.get(data.Channel)) return;
    const channel = interaction.guild.channels.cache.get(data.Channel);
    if (!channel) return;
    const suggestion = interaction.options.getString('suggestion');

simplydjs.suggestSystem(client, interaction, suggestion, {
chid: channel.id,
embedColor: "#FFFFFF", // defaultL #075FFF
credit: false
})
  } else {
          return;
        }
      })
    }
}
