const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { color, errorcolor, avatar } = require('../../configs/client.json');

module.exports = {
    name: "chatbot",
    description: "Shows Chatbot Config Of This Server!",
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
      const embed = new MessageEmbed()
      .setTitle(`Chatbot Configuration`)
      .setColor(color)
      .addFields(
		{ name: '/set-chatbot', value: 'Sets A Channel For Gadget ChatBot!' },
    { name: '/remove-chatbot', value: 'Removes Chatbot System On This Server!' },
	)
  .setFooter(`Gadget - Autorole Configuration`)

  interaction.followUp({ embeds: [embed] });
    },
};
