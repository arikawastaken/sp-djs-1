const { Client, CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { color, errorcolor, avatar, voteLink } = require('../../configs/client.json');

module.exports = {
    name: "balance",
    description: "Shows The Cash You Have!",
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        let result = await client.cs.balance({
            user: interaction.user
        });
        const embed = new MessageEmbed()
        .setTitle('Your Balance')
        .setDescription(
          `Wallet: ${(result.wallet).toLocaleString()} Gons\nBank: ${(result.bank).toLocaleString()} Gons`
        )
        .setColor(color)
        .setFooter(`Gadget - Gons Currency`);
      const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setLabel('Want More?')
					.setStyle('LINK')
          .setURL(voteLink),
			);
     interaction.followUp({ embeds: [embed], components: [row] });
    },
};
