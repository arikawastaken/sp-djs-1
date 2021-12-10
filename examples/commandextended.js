const { Client, CommandInteraction, Permissions, MessageEmbed } = require("discord.js");
const { color, errorcolor, avatar } = require('../../configs/client.json');

module.exports = {
    name: "",
    description: "",
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        if (interaction.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
            if (interaction.guild.me.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
                // Write Code Below!
    } else {
client.error(interaction, "I Dont Have Permission To Use This Command! `KICK_MEMBERS`");
    }
        } else {
client.error(interaction, "You Dont Have Permission To Use This Command! `KICK_MEMBERS`");
        }
    },
};
