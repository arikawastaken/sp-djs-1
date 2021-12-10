const client = require("../bot.js");
const { MessageEmbed, WebhookClient } = require("discord.js");
const chalk = require('chalk');
const moment = require("moment");

client.on("ready", () => {
  function capitalize(string) {
   return string.charAt(0).toUpperCase() + string.slice(1);
  };
  console.log(chalk.bold(chalk.blue.bold(`[${client.user.username.toUpperCase().split(" ")[0]}]`)) + chalk.cyan.bold(" Successfully loaded " + chalk.blue.underline(`${client.commands.size}`) + " Slash Commands!"));
  console.log(chalk.bold(chalk.blue.bold(`[${client.user.username.toUpperCase().split(" ")[0]}]`)) + chalk.bold.cyan(` Bot User: `) + chalk.blue.underline(`${client.user.tag}`));
  console.log(chalk.bold(chalk.blue.bold(`[${client.user.username.toUpperCase().split(" ")[0]}]`)) + chalk.bold.cyan(` Bot ID: `) + chalk.blue.underline(`${client.user.id}`));
  console.log(chalk.bold(chalk.blue.bold(`[${client.user.username.toUpperCase().split(" ")[0]}]`)) + chalk.bold.cyan(` Guild(s): `) + chalk.blue.underline(`${client.guilds.cache.size}`));
  console.log(chalk.bold(chalk.blue.bold(`[${client.user.username.toUpperCase().split(" ")[0]}]`)) + chalk.bold.cyan(` Watching: `) + chalk.blue.underline(`${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} members`));
  console.log(chalk.bold(chalk.blue.bold(`[${client.user.username.toUpperCase().split(" ")[0]}]`)) + chalk.bold.cyan(` Node.js: `) + chalk.blue.underline(`${process.version}`));
  console.log(chalk.bold(chalk.blue.bold(`[${client.user.username.toUpperCase().split(" ")[0]}]`)) + chalk.bold.cyan(` Plattform: `) + chalk.blue.underline(`${process.platform} ${process.arch}`));
  console.log(chalk.bold(chalk.blue.bold(`[${client.user.username.toUpperCase().split(" ")[0]}]`)) + chalk.bold.cyan(` Memory: `) + chalk.blue.underline(`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}/${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB`));
  console.log(chalk.bold(chalk.blue.bold(`[${client.user.username.toUpperCase().split(" ")[0]}]`)) + chalk.bold.cyan(" Report generated at: " + chalk.blue.bold.underline(moment().format('LLLL'))));
  console.log(chalk.bold(chalk.blue.bold(`[${client.user.username.toUpperCase().split(" ")[0]}]`)) + chalk.bold.cyan(" Client connected! Logged to Discord as ") + chalk.bold.blue.underline(client.user.tag));
  const statuswebhook = new WebhookClient({ url: client.config.webhook });
  const status = new MessageEmbed() // Prettier
   .setColor(client.config.color)
   .setTimestamp()
   .setAuthor(`${capitalize(client.user.username)} Is Online!`, client.user.displayAvatarURL())
   .setThumbnail(client.user.displayAvatarURL()) // Prettier
   .setDescription(`>>> Guilds: \`${client.guilds.cache.size} servers\`
   Members: \`${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} members\`
   Logged at: <t:${moment(new Date()).unix()}>`);
  statuswebhook.send({
   username: capitalize(client.user.username) + " Status",
   avatarURL: client.user.displayAvatarURL(),
   embeds: [status],
  });
    setInterval(() => {
        client.user.setActivity(`${client.guilds.cache.size} Servers | /help`, { type: 'WATCHING' })
    }, 60000);
});