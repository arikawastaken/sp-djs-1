const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { color, errorcolor, avatar } = require('../../configs/client.json');

module.exports = {
    name: "gons",
    description: "Leaderboard Of Gadget's Currency Gons!",
    type: 'CHAT_INPUT',
    options: [
      {
        type: 'SUB_COMMAND',
        name: 'leaderboard',
        description: 'Shows Leaderboard Of Gons Currency!'
      }
    ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        let data = await client.cs.globalLeaderboard();
    if (data.length < 1) return message.channel.send("Nobody's in leaderboard yet!");
    const msg = new MessageEmbed();
    let pos = 0;
    // This is to get First 10 Users )
    data.slice(0, 10).map(e => {
        pos++
        if (!client.users.cache.get(e.userID)) return;
        msg.addField(`${pos} - **${client.users.cache.get(e.userID).username}**`, `Wallet: **${e.wallet}** - Bank: **${e.bank}**`, true)
        msg.setColor(color)
        msg.setFooter(`Gadget - Gons Leaderboard`);
    });
    interaction.followUp({ embeds: [msg] });
    },
};
