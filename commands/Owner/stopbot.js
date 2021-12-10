const { Client, CommandInteraction, Permissions, MessageEmbed } = require("discord.js");
const { color, errorcolor, avatar, ownerId } = require('../../configs/client.json');

module.exports = {
    name: "stopbot",
    description: "Stops The Bot!",
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        if (interaction.user.id === ownerId) {
          await interaction.followUp(`Stopping The Bot..!`).then(setInterval(function(){ interaction.editReply(`Processes Stopped! (Exiting..)`) }, 3000)).then(setInterval(function(){ process.exit(); }, 5000));
    } else {
client.error(interaction, "This Is A Owneronly Command!");
    }
    },
};
