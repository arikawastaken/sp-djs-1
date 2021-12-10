const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { color, errorcolor, avatar } = require('../../configs/client.json');

module.exports = {
    name: "membercount",
    description: "Shows A Number Of The Members Of Current Server!",
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        var memberCount = interaction.guild.memberCount
        const embed = new MessageEmbed()
        .setTitle('Member Count')
        .setColor(color)
        .setDescription(`There Are **${memberCount}** Members In This Server!`)
        .setThumbnail(avatar)
        .setFooter(`Gadget - Requested By ${interaction.user.tag}`);

        interaction.followUp({ embeds: [embed] });
    },
};
