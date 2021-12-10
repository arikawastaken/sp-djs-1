const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { color, errorcolor, avatar } = require('../../configs/client.json');

module.exports = {
    name: "firstmessage",
    description: "Shows The First Message In Specified/Current Channel!",
    type: 'CHAT_INPUT',
    options: [
      {
        name: 'channel',
        description: 'Mention A Channel For First Message!',
        type: 'CHANNEL',
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
      const fetchchannel = interaction.options.getChannel('channel');
      if (fetchchannel) {
        const fetchMessages = await fetchchannel.messages.fetch({
      after: 1,
      limit: 1,
    });
    const msg = fetchMessages.first();

      const embed = new MessageEmbed()
        .setTitle(`First Messsage in ${fetchchannel.name}`)
        .setURL(msg.url)
        .setThumbnail(msg.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`Content: ${msg.content}\nAuthor: ${msg.author}\nMessage ID: ${msg.id}`)
        .setFooter('Gadget - First Message')
        .setTimestamp()

    interaction.followUp({ embeds: [embed] });
      }
      if (!fetchchannel) {
    const fetchMessages = await interaction.channel.messages.fetch({
      after: 1,
      limit: 1,
    });
    const msgg = fetchMessages.first();

      const embeded = new MessageEmbed()
        .setTitle(`First Messsage in ${interaction.channel.name}`)
        .setURL(msgg.url)
        .setThumbnail(msgg.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`Content: ${msgg.content}\nAuthor: ${msgg.author}\nMessage ID: ${msgg.id}`)
        .setFooter('Gadget - First Message')

    interaction.followUp({ embeds: [embeded] });
      }
    },
};
