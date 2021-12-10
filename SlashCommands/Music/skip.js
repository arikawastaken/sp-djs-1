const player = require("../../client/player");
const { Permissions, MessageEmbed } = require("discord.js");
const { color, errorcolor, avatar } = require('../../configs/client.json');

module.exports = {
    name: "skip",
    description: "skip the current song",
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

        await queue.skip();

        const embed = new MessageEmbed()
        .setTitle('Music Skipped')
        .setDescription(`Skipped The Current Song!`)
        .setThumbnail(avatar)
        .setFooter(`Gadget - Music System`)
        .setColor(color);
        interaction.followUp({ embeds: [embed] });
    },
};
