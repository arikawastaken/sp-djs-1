const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { color, errorcolor, avatar } = require('../../configs/client.json');

module.exports = {
    name: "inventory",
    description: "Shows What You Have!",
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
    let result = await client.cs.getUserItems({
        user: interaction.user
    });
    let inv = result.inventory.slice(0, 10)
    const embed = new MessageEmbed()
        .setDescription('Your Inventory is Empty!')
    for (key of inv) {
        embed.addField(`**${key.name}:**`, `Amount: ${key.amount}`);
        embed.setDescription('Your Inventory!')
    }
    interaction.followUp({ embeds: [embed] })
    },
};
