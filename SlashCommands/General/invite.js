const { Client, CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { color, errorcolor, avatar, supportServer, inviteLink } = require('../../configs/client.json');

module.exports = {
    name: "invite",
    description: "Invite Me In Your Server!",
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const invite = new MessageEmbed()
        .setTitle(`Gadget's Invite Link`)
        .setDescription(`[Click Here To Add Me In Your Server](${inviteLink}) \n [Click Here To Join Our Support Server](${supportServer})`)
        .setThumbnail(avatar)
        .setFooter('Gadget - Invite Me :)')
        .setColor(color)

      const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setLabel('Invite')
					.setStyle('LINK')
          .setURL(inviteLink),
        new MessageButton()
					.setLabel('Support Server')
					.setStyle('LINK')
          .setURL(supportServer),
			);

        interaction.followUp({ embeds: [invite], components: [row] });
    },
};
