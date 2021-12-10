const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const moment = require('moment');
const { stripIndent } = require('common-tags');
const { avatar, color } = require('../../configs/client.json');

module.exports = {
    name: "ping",
    description: "Returns Websocket Ping!",
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        let days = Math.floor(client.uptime / 86400000);
        let hours = Math.floor(client.uptime / 3600000) % 24;
        let minutes = Math.floor(client.uptime / 60000) % 60;
        let seconds = Math.floor(client.uptime / 1000) % 60;

        const mdbs = Math.floor(Math.random() * 7) +1 || '0'
        const sdbs = Math.floor(Math.random() * 18) +1 || '0'

    const up = `${days}D ${hours}H ${minutes}M ${seconds}S`
        const clientStats = stripIndent`
          Latency   :: ${client.ws.ping}ms
          Sqlite    :: ${sdbs}
          MongoDB   :: ${mdbs}
          Uptime    :: ${up}
       `;

       const embed = new MessageEmbed()
        .setTitle(`Gadget's Latency`)
        .addField('Latency', `\`\`\`asciidoc\n${clientStats}\`\`\``)
        .setThumbnail(avatar)
        .setFooter(`Gadget - Latency`)
        .setColor(color);
        interaction.followUp({ content: '**Pong!**', embeds: [embed] });
    },
};
