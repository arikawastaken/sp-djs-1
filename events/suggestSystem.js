const client = require('../bot.js');
const { mongoSrv } = require('../settings.js');
const simplydjs = require('simply-djs')
let { Database } = require('quickmongo')
let db = new Database(mongoSrv)
const schema = require('../models/suggest.js');

client.on('interactionCreate', async (interaction) => {
  if (interaction.user.bot || !interaction.guild) return;
    const data = await schema.findOne({ Guild: interaction.guild.id });
    if (!data) return;
    if (!interaction.guild.channels.cache.get(data.Channel)) return;
    const channel = interaction.guild.channels.cache.get(data.Channel);
    if (!channel) return;

simplydjs.suggestBtn(interaction, db, {
  credit: false
})
});