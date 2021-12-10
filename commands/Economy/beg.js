const { Client, CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { color, errorcolor, avatar, voteLink } = require('../../configs/client.json');

module.exports = {
    name: "beg",
    description: "Beg For Some Money! Im Poor :(",
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        let result = await client.cs.beg({
            user: interaction.user,
            minAmount: 100,
            maxAmount: 400
        });
        if (result.error) return interaction.followUp(`You have begged recently Try again in ${result.time}`);

        const embed = new MessageEmbed()
        .setTitle('You Begged')
        .setDescription(
          `You Begged And Earned ${result.amount} Gons!`
        )
        .setColor(color)
        .setFooter(`Gadget - Beg For Money`);
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
