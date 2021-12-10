const { Client, CommandInteraction } = require("discord.js");
const { color, errorcolor, avatar } = require('../../configs/client.json');

module.exports = {
    name: "watch",
    description: "Watch Videos Together With Your Firends!",
    type: 'CHAT_INPUT',
    options: [
      {
        type: 'SUB_COMMAND',
        name: 'youtube',
        description: 'Watch Youtube Together With Your Firends!'
      }
    ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const command = interaction.options.getSubcommand()

        if (command === "youtube") {
          if (interaction.member.voice.channel) {
            client.discordTogether.createTogetherCode(interaction.member.voice.channel.id, 'youtube').then(async invite => {
               return interaction.followUp(`Click Here To Join:\n${invite.code}`);
});
          } else return interaction.followUp(`Please Join A Voice Channel First!`);
        }
    },
};
