const Discord = require('discord.js');

module.exports = function (client) {
  const logs = require('discord-logs');
  logs(client);
}