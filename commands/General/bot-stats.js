const { Client, CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { color, errorcolor, avatar, inviteLink, website, supportServer, voteLink } = require('../../configs/client.json');
const moment = require('moment');
const { mem, cpu, os } = require('node-os-utils');
const { stripIndent } = require('common-tags');

module.exports = {
    name: "bot",
    description: "Client/Server Stats Of Gadget Bot!",
    type: 'CHAT_INPUT',
    options: [
      {
        type: 'SUB_COMMAND',
        name: 'stats',
        description: 'Stats Of Gadget Discord Bot!'
      },
      {
        type: 'SUB_COMMAND',
        name: 'uptime',
        description: 'Uptime Of Gadget Discord Bot!'
      },
      {
        type: 'SUB_COMMAND',
        name: 'about',
        description: 'Shows Bot About Page!'
      }
    ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
      if (interaction.options.getSubcommand() === "stats") {
        let days = Math.floor(client.uptime / 86400000);
        let hours = Math.floor(client.uptime / 3600000) % 24;
        let minutes = Math.floor(client.uptime / 60000) % 60;
        let seconds = Math.floor(client.uptime / 1000) % 60;

        const up = `${days}D ${hours}H ${minutes}M ${seconds}S`
        const clientStats = stripIndent`
          Servers   :: ${interaction.client.guilds.cache.size}
          Users     :: ${interaction.client.users.cache.size}
          Channels  :: ${interaction.client.channels.cache.size}
          WS Ping   :: ${Math.round(interaction.client.ws.ping)}ms
          Uptime    :: ${up}
       `;
        const { totalMemMb, usedMemMb } = await mem.info();
        const serverStats = stripIndent`
          OS        :: Linux
          Cores     :: ${cpu.count()}
          CPU Usage :: ${await cpu.usage()} %
          RAM       :: ${totalMemMb} MB
          RAM Usage :: ${usedMemMb} MB
        `;
    
        const embed = new MessageEmbed()
        .setTitle('Gadget Statistics')
        .addField('Client Stats', `\`\`\`asciidoc\n${clientStats}\`\`\``)
        .addField('Server Stats', `\`\`\`asciidoc\n${serverStats}\`\`\``)
        .setFooter(`Gadget - Requested By ${interaction.user.tag}`)
        .setColor(color)
        .setThumbnail(avatar);
        interaction.followUp({ embeds: [embed] });
      } else if (interaction.options.getSubcommand() === "uptime") {
        let days = Math.floor(client.uptime / 86400000);
        let hours = Math.floor(client.uptime / 3600000) % 24;
        let minutes = Math.floor(client.uptime / 60000) % 60;
        let seconds = Math.floor(client.uptime / 1000) % 60;

        const up = `${days}D ${hours}H ${minutes}M ${seconds}S`
        const botembed = new MessageEmbed()
        .setTitle("Gadget's Uptime")
        .setColor(color)
        .setDescription(`**Gadget Is Active From** \`${up}\``)
        .setFooter("Gadget - Bot Uptime")
        .setThumbnail(avatar);

        interaction.followUp({ embeds: [botembed] });
      } else if (interaction.options.getSubcommand() === "about") {
        const aboutBed = new MessageEmbed()
        .setTitle(`Gadget's About`)
        .setColor(color)
        .addFields(
		{ name: 'Developer', value: 'Glory#6969' },
    { name: 'NodeJS', value: '16 / Latest' },
    { name: 'Library', value: 'Discord.js@13' },
    { name: 'Version', value: '1.0.0' },
    { name: 'Developer Team', value: 'Arki͛͛#9696', inline: false },
		{ name: 'Bot Testers', value: 'Ultra Musk#6969', inline: false },
	)
  .setFooter(`Gadget - Bot About`);
  		const raw = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setLabel('Support Server')
					.setStyle('LINK')
          .setURL(supportServer),
        new MessageButton()
					.setLabel('Invite Link')
					.setStyle('LINK')
          .setURL(inviteLink),
        new MessageButton()
					.setLabel('Website')
					.setStyle('LINK')
          .setURL(website),
        new MessageButton()
					.setLabel('Vote')
					.setStyle('LINK')
          .setURL(voteLink),
			);

      interaction.followUp({ embeds: [aboutBed], components: [raw] });
      }
    },
};
