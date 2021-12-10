const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { color, errorcolor, avatar } = require('../../configs/client.json');

module.exports = {
    name: "modlogs",
    description: "Shows Modlogs Config Of This Server!",
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
      const embed = new MessageEmbed()
      .setTitle(`Modlogs Configuration`)
      .setColor(color)
      .addFields(
		{ name: '/set-modlogs', value: 'Sets A Channel For Server Logs!' },
    { name: '/remove-modlogs', value: 'Removes Modlogs System On This Server!' },
	)
  .setFooter(`Gadget - Modlogs Configuration`)

  interaction.followUp({ embeds: [embed] });
    },
};
