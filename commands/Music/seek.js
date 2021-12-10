const player = require("../../client/player");
const { Permissions, MessageEmbed } = require("discord.js");
const { color, errorcolor, avatar } = require('../../configs/client.json');

module.exports = {
    name: "seek",
    description: "Seeks To Provided Time!",
    options: [
      {
        name: 'time',
        description: 'Time (In Seconds)',
        type: 'INTEGER',
        required: true
      }
    ],
    run: async (client, interaction, args) => {
        const queue = player.getQueue(interaction.guildId);
        if (!queue?.playing)
            return interaction.followUp({
                content: "No music is currently being played",
            });

          if (!interaction.member.voice.channel)
            return interaction.followUp({
                content: "Please join a voice channel first!",
            });

            const time = interaction.options.getInteger('time');

        await queue.seek(time);

        const embed = new MessageEmbed()
        .setDescription(`Seeked To ${time}!`)
        .setThumbnail(avatar)
        .setFooter(`Gadget - Music System`)
        .setColor(color);
        interaction.followUp({ embeds: [embed] });
    },
};
