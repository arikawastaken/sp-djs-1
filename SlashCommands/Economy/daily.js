const { Client, CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { color, errorcolor, avatar, voteLink } = require('../../configs/client.json');

module.exports = {
    name: "daily",
    description: "Claim Your Daily Reward!",
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        let result = await client.cs.daily({
            user: interaction.user,
            amount: 5000
        });
        if (result.error) return interaction.followUp(`You Have Already Claimed Your Daily Reward, Please Try Again In ${result.time}!`)
        const embed = new MessageEmbed()
        .setTitle('Daily Reward')
        .setDescription(
          `GG! You Got ${result.amount} Gons!`
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
