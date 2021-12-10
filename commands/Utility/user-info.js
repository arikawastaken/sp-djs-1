const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { color, errorcolor, avatar } = require('../../configs/client.json');

module.exports = {
    name: "user-info",
    description: "Shows Information About Mentioned Member!",
    type: 'CHAT_INPUT',
    options: [
      {
        name: 'member',
        description: 'User Info Of ?',
        type: 'USER',
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
        const user = interaction.options.getMember('member') || interaction;

  
   const embed = new MessageEmbed() // Prettier
    .setColor("#4f545c")
    .setAuthor("User information", user.user.displayAvatarURL())
    .setThumbnail(
     user.user.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     })
    )
     .setColor(color)
    .setTimestamp()
    .setFooter(
     `Requested By ${interaction.user.tag}`,
     interaction.user.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     })
    );
   embed.addField(`ID`, `> \`${user.user.id}\``, true);
   embed.addField(`Discriminator`, `> \`#${user.user.discriminator}\``, true);
   if (user.nickname) embed.addField(`${client.bot_emojis.member} Nickname`, `> \`${user.nickname}\``);
  
   
   embed.addField(`Account banned?`, `> ${user.deleted ? "Yes, account banned!" : "No, account still available"}`);
   embed.setTitle(`${user.user.tag} ${user.user.bot ? `${client.bot_emojis.bot_badge_part_1}${client.bot_emojis.bot_badge_part_2}` : ""}`);
   interaction.followUp({ embeds: [embed] });
    },
};
