const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { color, errorcolor, avatar } = require('../../configs/client.json');

module.exports = {
    name: "profile",
    description: "Shows Your Profile Of Gadget's Economy!",
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        let result = await client.cs.info(interaction.user.id);
    const embed = new MessageEmbed()
        .setDescription('Info About ' + interaction.user.tag)
        .setColor(color)
        .setFooter(`Gadget - Your Economy Profile`);
        let unUsed = '';
        let cantBeUsed = '';
        for (const [key, value] of result.info) {
            if (value.used) unUsed += `- ${key}\n`;
            else cantBeUsed += `- ${key} ( ${value.timeLeft} )\n`;
        }
        embed.addField('Commands That you can use:', unUsed || 'None');
        embed.addField('Commands That you can\'t use:', cantBeUsed || 'None');
    interaction.followUp({ embeds: [embed] });
    },
};
