const { Client, CommandInteraction, MessageAttachment, MessageEmbed } = require("discord.js");
const { color, errorcolor, avatar } = require('../../configs/client.json');
const Levels = require("discord-xp");
const canvacord = require("canvacord");
const Schema = require('../../models/leveling.js');
const moment = require('moment');
const { stripIndent } = require('common-tags');

module.exports = {
    name: "leaderboard",
    description: "Shows The Rank Leaderboard Of This Server!",
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
      Schema.findOne({
                Guild: interaction.guild.id
            }, async(err, data) => {
    if (!data) {
      interaction.followUp("Leveling System Is Not Enabled On This Server!");
    }
        if (data) {
const rawLeaderboard = await Levels.fetchLeaderboard(interaction.guild.id, 10);

if (rawLeaderboard.length < 1) return reply("Nobody's in leaderboard yet.");

const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard, true);

const lb = leaderboard.map(e => `${e.position}. ${e.username}#${e.discriminator} Level: ${e.level} XP: ${e.xp.toLocaleString()}`);

const logging = stripIndent`
     ${lb.join("\n\n")}
 `;

 const embed = new MessageEmbed()
        .addField('**Rank Leaderboard Of This Server**:', `\`\`\`asciidoc\n${logging}\`\`\``)
        .setThumbnail(client.config.avatar)
        .setFooter(`Gadget - Rank Leaderboard`)
        .setColor(color);

interaction.followUp({ embeds: [embed] });
  } else {
          return;
        }
      })
    }
}