const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { color, errorcolor, avatar } = require('../../configs/client.json');

module.exports = {
    name: "deposit",
    description: "Deposit Money To Your Bank!",
    type: 'CHAT_INPUT',
    options: [
      {
        name: 'amount',
        description: 'Amount To Deposit ?',
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

        let result = await client.cs.deposite({
            user: interaction.user,
            amount: money
        });

        if (result.error) {
            if (result.type === 'money') return interaction.followUp("Specify an amount to deposit!");
            if (result.type === 'negative-money') return interaction.followUp("You can't deposite negative money");
            if (result.type === 'low-money') return interaction.followUp("You don't have that much money in wallet.");
            if (result.type === 'no-money') return interaction.followUp("You don't have any money to deposit");
            if (result.type === 'bank-full') return interaction.followUp("Your bank is full. It has reached it's limit.");
        } else {
            if (result.type === 'all-success') {
              const embed = new MessageEmbed()
              .setTitle(`Deposited Money`)
              .setColor(color)
              .setDescription(`You Have Deposited All Your Money To Your Bank!\nNew Bank Balance: ${result.rawData.bank} Gons`)
              .setFooter(`Gadget - Deposit Gons`)

              interaction.followUp({ embeds: [embed] });
            }
            if (result.type === 'success') {
              const embedd = new MessageEmbed()
              .setTitle(`Deposited Money`)
              .setColor(color)
              .setDescription(`You Have Deposited ${money} Gons To Your Bank!\nNew Bank Balance: ${result.rawData.bank} Gons`)
              .setFooter(`Gadget - Deposit Gons`)

              interaction.followUp({ embeds: [embedd] });
            }
        };
    },
};
