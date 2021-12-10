const client = require("../bot.js");
const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const logger = require('../utils/logger');

client.on("guildCreate", async (guild) => {
let muteRole = guild.roles.cache.find(r => r.name.toLowerCase() === 'muted');
if (!muteRole) {
    try {
      guild.roles.create({ name: 'muted', permissions: [Permissions.FLAGS.VIEW_CHANNELS] });
    } catch {

    }
}
});