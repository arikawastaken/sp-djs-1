const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { color, errorcolor, avatar } = require('../../configs/client.json');

module.exports = {
    name: "give",
    description: "Help Someone By Giving Them Some Money!",
    type: 'CHAT_INPUT',
    options: [
      {
        name: 'member',
        description: 'Give Money To ?',
        type: 'USER',
        required: true
      },
      {
        name: 'amount',
        description: 'Amount You Want To Give ?',
        type: 'STRING',
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
      const user = interaction.options.getMember('member');
      const amount = interaction.options.getString('amount') || 500;

      if (isNaN(amount)) return interaction.followUp(`Please Provide A Vaild Number Of Money To Give!`);
      if (amount.includes("-")) return interaction.followUp(`Cool, But You Cannot Give Negative Money!`);

      let money = parseInt(amount);

         let result = await client.cs.transferMoney({
            user: interaction.user,
            user2: user,
            amount: money
        });
        if (result.error) return interaction.followUp(`You don't have enough money in your wallet...`);
        const embed = new MessageEmbed()
        .setTitle(`Money Sent`)
        .setColor(color)
        .setDescription(`You Sent ${money} Gons To ${user}`)
        .setFooter(`Gadget - Help Someone :)`)

        interaction.followUp({ embeds: [embed] });
    },
};
