const player = require("../../client/player");
const { Permissions, MessageEmbed } = require("discord.js");
const { color, errorcolor, avatar } = require('../../configs/client.json');

module.exports = {
    name: "pause",
    description: "pause the current song",
    run: async (client, interaction) => {
        const queue = player.getQueue(interaction.guildId);
        if (!queue?.playing)
            return interaction.followUp({
                content: "No Music Is Currently Being Played!",
            });
          if (!interaction.member.voice.channel)
            return interaction.followUp({
                content: "Please join a voice channel first!",
            });

        queue.setPaused(true);

        const embed = new MessageEmbed()
        .setTitle('Music Paused')
        .setDescription(`Paused The Current Song!`)
        .setThumbnail(avatar)
        .setFooter(`Gadget - Music System`)
        .setColor(color);
        return interaction.followUp({ embeds: [embed] });
    },
};
