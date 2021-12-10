const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { color, errorcolor, avatar } = require('../../configs/client.json');
const moment = require("moment");
function capitalize(string) {
 return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = {
    name: "server",
    description: "Shows Current Icon/Stats Of The Server!",
    type: 'CHAT_INPUT',
    options: [
      {
        type: "SUB_COMMAND",
        name: "info",
        description: "Shows Current Stats Of The Server!"
      },
      {
        type: 'SUB_COMMAND',
        name: 'icon',
        description: 'Shows Current Icon Of The Server!'
      }
    ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
      if (interaction.options.getSubcommand() === "info") {
   interaction.guild.fetch();
   interaction.guild.members.fetch();
   const embed = new MessageEmbed() // Prettier
    .setAuthor(interaction.guild.name)
    .setColor(color)
    .setThumbnail(avatar)
    .addField(`Owner`, `> <@${interaction.guild.ownerId}> (ID: \`${interaction.guild.ownerId}\`)`, true)
    .addField(`Server ID`, `> \`${interaction.guild.id}\``, true)
    .addField(`Description`, `> ${interaction.guild.description || "No server description!"}`)
    .addField(`Members`, `\`${interaction.guild.memberCount}/${interaction.guild.maximumMembers}\` members (\`${interaction.guild.members.cache.filter((member) => member.user.bot).size}\` bots)`)
    .addField(`Emojis`, `> Total emojis: \`${interaction.guild.emojis.cache.size}\``, true)
    .addField(`Boosts`, `> \`${interaction.guild.premiumSubscriptionCount}\` (${capitalize(interaction.guild.premiumTier.toLowerCase().replace("_", " "))})`, true)
    .addField(`Verification`, `> \`${capitalize(interaction.guild.verificationLevel.toLowerCase().replace("_", " "))}\``, true)
    .addField(`Creation Date`, `> <t:${moment(interaction.channel.guild.createdTimestamp).unix()}> (<t:${moment(interaction.channel.guild.createdTimestamp).unix()}:R>)`, true)
    .setFooter(
     `Gadget - Requested By ${interaction.user.tag}`,
     interaction.user.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     })
    )
    .setTimestamp();
   interaction.followUp({ embeds: [embed] });
      } else if (interaction.options.getSubcommand() === "icon") {
        const embed = new MessageEmbed()
        .setTitle(`${interaction.guild.name}'s Icon`)
        .setImage(interaction.guild.iconURL({ dynamic: true, size: 2048 }))
        .setColor(color)
        .setFooter(`Gadget - Requested By ${interaction.user.tag}`)

        interaction.followUp({ embeds: [embed] });
      }
    },
};
