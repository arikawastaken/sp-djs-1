const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { color, errorcolor, avatar } = require('../../configs/client.json');
var figlet = require('figlet');

module.exports = {
    name: "ascii",
    description: "Converts The Text To Ascii Art!",
    type: 'CHAT_INPUT',
    options: [
      {
        name: 'text',
        description: 'Specify a text to convert to ascii art!',
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
      const text = interaction.options.getString('text');
        var maxLen = 20

        if (text.length > maxLen) return interaction.followUp("The Text Length Cannot Be Above 20!");

        figlet.text(text, {
          font: ""
        }, async(err, data) => {
          const art = new MessageEmbed()
          .setColor(color)
          .setDescription(`\`\`\`${data}\`\`\`\``)

          interaction.followUp({ embeds: [art] });
        })
    },
};