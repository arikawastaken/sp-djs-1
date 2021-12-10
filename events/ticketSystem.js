const client = require('../bot.js');
const simplydjs = require('simply-djs');
const ticket = require('../models/ticket.js');

client.on("interactionCreate", async (interaction) => {
  const data = await ticket.findOne({ Guild: interaction.guild.id });
    if (!data) return;
    if (!client.channels.cache.find(cat=> cat.id === data.Category)) return;
    if (!data.Category) return;
    const sCategory = data.Category;
    const sRole = data.Role;

simplydjs.clickBtn(interaction, {
  embedDesc: "Thanks You For Creating The Ticket, Support Will Be Here Soon!",
  embedColor: client.config.color, // default: #075FFF
  closeColor: "SECONDARY",
  closeEmoji: "🔒",
  delColor: "SECONDARY",
  delEmoji: "❌", // default: ❌
  openColor: "SECONDARY",
  openEmoji: "🎫",
  timeout: false,
  cooldownMsg: "You Already Have A Ticket!",
  categoryID: sCategory,
  role: sRole,
  ticketname: "ticket-{tag}", // Custom Ticket name. {tag} | {id} | {username}
  credit: false
});
});