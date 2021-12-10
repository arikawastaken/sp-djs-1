const Discord = require('discord.js');

module.exports = function (client) {
  client.max_input = 20;
const { version, description }  = require("../package.json")
client.version = version;
client.description = description;
client.error = function (interaction, error_message, error_ephemeral) {
  if (!interaction) return;
  if (!error_message) return;
  const cmdDes = `<a:gadget_error:910730595024392202> ${error_message}`
  const error = new Discord.MessageEmbed() // Prettier
   .setColor(client.config.errorcolor)
   .setDescription(cmdDes);
  return interaction.followUp({ embeds: [error], ephemeral: true });
 };
};