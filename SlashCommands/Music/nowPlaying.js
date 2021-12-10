const player = require("../../client/player");
const { color, errorcolor, avatar } = require('../../configs/client.json');

module.exports = {
    name: "now-playing",
    description: "shows information about the current song",
    run: async (client, interaction) => {
        const queue = player.getQueue(interaction.guildId);
        if (!queue?.playing)
            return interaction.followUp({
                content: "No music is currently being played!",
            });

          if (!interaction.member.voice.channel)
            return interaction.followUp({
                content: "Please join a voice channel first!",
            });

        const progress = queue.createProgressBar();
        const perc = queue.getPlayerTimestamp();

        return interaction.followUp({
            embeds: [
                {
                    title: "Now Playing",
                    description: `🎶 | **${queue.current.title}**! (\`${perc.progress}%\`)`,
                    fields: [
                        {
                            name: "\u200b",
                            value: progress,
                        },
                    ],
                    color: color,
                    thumbnail: avatar,
                    footer: {
                        text: `Gadget - Queued By ${queue.current.requestedBy.tag}`,
                    },
                },
            ],
        });
    },
};
