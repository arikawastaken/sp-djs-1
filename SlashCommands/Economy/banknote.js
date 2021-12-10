const { Client, CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { color, errorcolor, avatar, voteLink } = require('../../configs/client.json');

module.exports = {
    name: "banknote",
    description: "Use Your BankNotes To Increase Your Bankspace, Only If You Have One!",
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
         const arr = await client.cs.getUserItems({
        user: interaction.user
    });
    if (!arr.inventory.length) return interaction.followUp("You don't have any banknotes!");
    for (i in arr.inventory) {
        if (arr.inventory[i].name.toLowerCase().includes('banknote')) {
            i++
            const removeItem = await client.cs.removeUserItem({
                user: interaction.user,
                item: i
            });
            if (removeItem.error) {
                return interaction.followUp(`Something went worng...`);
            };
            const ToincreasedAmount = 5000 + removeItem.rawData.bankSpace;
            const result = await cs.setBankSpace(interaction.user.id, ToincreasedAmount);
            if (!result.error) {
      const embed = new MessageEmbed()
        .setTitle('Banknote')
        .setDescription(
          `GG! Increased Your Bank Limit To ${result.amount}!`
        )
        .setColor(color)
        .setFooter(`Gadget - Used Banknote`);
      const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setLabel('Want More?')
					.setStyle('LINK')
          .setURL(voteLink),
			);
     interaction.followUp({ embeds: [embed], components: [row] });
            }
            else return interaction.followUp(`Error: occured: ${result.error}`);

        } else return interaction.followUp("You Dont Have Any Banknotes!");
    };
    },
};
