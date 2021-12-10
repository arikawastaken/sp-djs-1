const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { color, errorcolor, avatar } = require('../../configs/client.json');

module.exports = {
    name: "withdraw",
    description: "Withdraw Money From Your Bank!",
    type: 'CHAT_INPUT',
    options: [
      {
        name: 'amount',
        description: 'Amount To Withdraw ?',
        type: 'INTEGER',
        required: false
      }
    ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const money = interaction.options.getInteger('amount') || 500;

        let result = await client.cs.withdraw({
            user: interaction.user,
            amount: money
        });

        if (result.error) {
            if (result.type === 'money') return interaction.followUp("Specify an amount to withdraw!");
            if (result.type === 'negative-money') return interaction.followUp("You can't withdraw negative money");
            if (result.type === 'low-money') return interaction.followUp("You don't have that much money in bank.");
            if (result.type === 'no-money') return interaction.followUp("You don't have any money to withdraw");
        } else {
            if (result.type === 'all-success') {
              const embed = new MessageEmbed()
              .setTitle(`Withdraw Money`)
              .setColor(color)
              .setDescription(`You Have Withdraw All Your Money From Your Bank!\nNew Bank Balance: ${result.rawData.bank} Gons`)
              .setFooter(`Gadget - Withdraw Gons`)

              interaction.followUp({ embeds: [embed] });
            }
            if (result.type === 'success') {
              const embedd = new MessageEmbed()
              .setTitle(`Withdraw Money`)
              .setColor(color)
              .setDescription(`You Have Withdraw ${money} Gons From Your Bank!\nNew Bank Balance: ${result.rawData.bank} Gons`)
              .setFooter(`Gadget - Withdraw Gons`)

              interaction.followUp({ embeds: [embedd] });
            }
        };
    },
};
