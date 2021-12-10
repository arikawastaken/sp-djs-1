const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { color, errorcolor, avatar } = require('../../configs/client.json');

module.exports = {
    name: "autorole",
    description: "Shows Autorole Config Of This Server!",
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
      const embed = new MessageEmbed()
      .setTitle(`Autorole Configuration`)
      .setColor(color)
      .addFields(
		{ name: '/set-autorole', value: 'Sets A Role For New Members' },
    { name: '/remove-autorole', value: 'Removes Autorole System On This Server!' },
	)
  .setFooter(`Gadget - Autorole Configuration`)

  interaction.followUp({ embeds: [embed] });
    },
};
