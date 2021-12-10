const player = require("../../client/player");
const { Permissions, MessageEmbed } = require("discord.js");
const { color, errorcolor, avatar } = require('../../configs/client.json');

module.exports = {
    name: "volume",
    description: "change or check the volume of the current song",
    options: [
        {
            name: "percentage",
            description: "percentage to change the volume to",
            type: "INTEGER",
            required: false,
        },
    ],
    run: async (client, interaction) => {
        const volumePercentage = interaction.options.getInteger("percentage");
        const queue = player.getQueue(interaction.guildId);
        if (!queue?.playing)
            return interaction.followUp({
                content: "No music is currently being played",
            });

          if (!interaction.member.voice.channel)
            return interaction.followUp({
                content: "Please join a voice channel first!",
            });

        if (!volumePercentage)
            return interaction.followUp({
                content: `The current volume is \`${queue.volume}%\``,
            });

        if (volumePercentage < 0 || volumePercentage > 100)
            return interaction.followUp({
                content: "The volume must be betweeen 1 and 100",
            });

        queue.setVolume(volumePercentage);

                const embed = new MessageEmbed()
               .setTitle('Music Volume')
               .setDescription(`The Volume For Current Song Has Been Set To **${volumePercentage}**!`)
               .setThumbnail(avatar)
               .setFooter(`Gadget - Music System`)
               .setColor(color);
        return interaction.followUp({ embeds: [embed] });
    },
};
