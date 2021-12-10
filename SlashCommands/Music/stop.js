const player = require("../../client/player");
const { Permissions, MessageEmbed } = require("discord.js");
const { color, errorcolor, avatar } = require('../../configs/client.json');

module.exports = {
    name: "stop",
    description: "Stops the current song",
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

        await queue.destroy();

        const embed = new MessageEmbed()
        .setTitle('Music Stopped')
        .setDescription(`Stopped The Current Song!`)
        .setThumbnail(avatar)
        .setFooter(`Gadget - Music System`)
        .setColor(color);
        interaction.followUp({ embeds: [embed] });
    },
};
