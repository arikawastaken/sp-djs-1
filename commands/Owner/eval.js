const { Client, CommandInteraction, Permissions, MessageEmbed } = require("discord.js");
const { color, errorcolor, avatar, ownerId } = require('../../configs/client.json');

module.exports = {
    name: "eval",
    description: "Shows Output Of Code!",
    type: 'CHAT_INPUT',
    options: [
      {
        name: 'code',
        description: 'Specify A Code!',
        type: 'STRING',
        required: true
      }
    ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        if (interaction.user.id === ownerId) {
          try {

          const code = interaction.options.getString('code');

          let evaluated = eval(code);
          let type = typeof evaluated;

    const success = new Discord.MessageEmbed() // Prettier
    .setColor("#4f545c")
    .addField(`${client.bot_emojis.screw_that} Type`, `\`\`\`js\n${type}\`\`\``)
    .addField(`${client.bot_emojis.input} Input`, `\`\`\`js\n${args.join(" ")}\`\`\``)
    .addField(`${client.bot_emojis.output} Output`, `\`\`\`js\n${evaluated}\`\`\``)
    .setFooter(
     `Requested by ${message.author.username}`,
     message.author.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     })
    );

    interaction.followUp({ embeds: [success] });

          } catch (e) {
            return;
          }
    } else {
client.error(interaction, "This Is A Owneronly Command!");
    }
    },
};
