const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { color, errorcolor, avatar } = require('../../configs/client.json');

module.exports = {
    name: "work",
    description: "Work To Earn Gons!",
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        let result = await client.cs.work({
            user: interaction.user,
            maxAmount: 100,
            replies: ['Programmer', 'Builder', 'Waiter', 'Busboy', 'Chief', 'Mechanic'],
            cooldown: 25 //25 seconds,
        });

        if (result.error) return interaction.followUp(`You have already worked recently Try again in ${result.time}`);
        const embed = new MessageEmbed()
        .setTitle(`You Worked`)
        .setColor(color)
        .setDescription(`You Worked As ${result.workType} And Earned ${result.amount} Gons!`)
        .setFooter(`Gadget - Worked As ${result.workType}`)

        interaction.followUp({ embeds: [embed] });
    },
};
