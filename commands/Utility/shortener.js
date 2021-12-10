const { Client, CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { color, errorcolor, avatar, bitlyApi } = require('../../configs/client.json');
const shorten = require("isgd");
const { isURL } = require("validator");

module.exports = {
    name: "shortener",
    description: "Makes The Provided URL Short!",
    type: 'CHAT_INPUT',
    options: [
      {
        name: "url",
        description: "URL To Make It Short!",
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
      const shurl = interaction.options.getString('url');
shorten.shorten(shurl, function (res) {
    const urldone = new MessageEmbed() // Prettier
     .setColor(color)
     .setTitle(`Shortener`)
     .setDescription(`Short Link: **${res}**`)
     .setThumbnail(avatar)
     .setFooter('Gadget - URL Shortener')
    const row = new MessageActionRow() // Prettier
     .addComponents(
      new MessageButton() // Prettier
       .setStyle("LINK")
       .setURL(res)
       .setLabel(`URL`)
     );
    interaction.followUp({ embeds: [urldone], components: [row] });
   });
    },
};
