const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { color, errorcolor, avatar } = require('../../configs/client.json');
const translate = require('@iamtraction/google-translate');

module.exports = {
    name: "translate",
    description: "Translates Any Other Lanugage Text To English!",
    type: 'CHAT_INPUT',
    options: [
      {
        name: 'text',
        description: 'The text to translate to english!',
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

        const translated = await translate(text, { to: 'en' });
        const embed = new MessageEmbed()
        .setTitle('Translated To English')
        .setDescription(`**Input**: ${text}\n**Output**: ${translated.text}`)
        .setThumbnail(avatar)
        .setFooter(`Gadget - Requested By ${interaction.user.tag}`)
        interaction.followUp({ embeds: [embed] });
    },
};
