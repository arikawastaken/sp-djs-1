const { Client, CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { color, errorcolor, avatar, supportServer, inviteLink } = require('../../configs/client.json');

module.exports = {
    name: "support",
    description: "Sends Gadget's Support Server Link!",
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const invite = new MessageEmbed()
        .setTitle(`Gadget's Support Server`)
        .setDescription(`[Click Here To Join Our Support Server](${supportServer})`)
        .setThumbnail(avatar)
        .setFooter('Gadget - Support Server')
        .setColor(color)

      const row = new MessageActionRow()
			.addComponents(
        new MessageButton()
					.setLabel('Support Server')
					.setStyle('LINK')
          .setURL(supportServer),
			);

        interaction.followUp({ embeds: [invite], components: [row] });
    },
};
