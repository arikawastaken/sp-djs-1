const { Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: "hello",
    description: "Replies Back Hello!",
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        interaction.followUp({ content: 'Hello There!' });
    },
};