const { Client, Collection, MessageEmbed, MessageAttachment } = require("discord.js");
const modlogsSchema = require('./models/modlogs.js');
const moment = require('moment');
const { stripIndent } = require('common-tags');
const Levels = require('discord-xp');
const canvas = require("discord-canvas"),
welcomeCanvas = new canvas.Welcome();
const welcomer = require('./models/welcomer.js');
const simplydjs = require("simply-djs");
const chalk = require('chalk');

const client = new Client({
    intents: 32767,
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});
module.exports = client;

// Global Variables
client.commands = new Collection();
client.config = require('./configs/client.json');
client.emotes = require('./configs/emojis.js');
client.emojis = require('./configs/custom_emojis.js');
client.serverConfig = require('./settings.js');
client.settings = client.serverConfig;


const giveawayModel = require('./models/giveaways.js');
const { GiveawaysManager } = require('discord-giveaways');
const GiveawayManagerWithOwnDatabase = class extends GiveawaysManager {

    async getAllGiveaways() {
        
        return await giveawayModel.find().lean().exec();
    }


    async saveGiveaway(messageId, giveawayData) {

        await giveawayModel.create(giveawayData);

        return true;
    }

    async editGiveaway(messageId, giveawayData) {

        await giveawayModel.updateOne({ messageId }, giveawayData, { omitUndefined: true }).exec();
   
        return true;
    }


    async deleteGiveaway(messageId) {

        await giveawayModel.deleteOne({ messageId }).exec();

        return true;
    }
};


const manager = new GiveawayManagerWithOwnDatabase(client, {
    default: {
        botsCanWin: false,
        embedColor: client.config.color,
        embedColorEnd: '#000000',
        reaction: '🎉'
    }
});
client.giveawaysManager = manager;
client.snipes = new Map();

client.on('messageDelete', async (message) => {
  if (message.author.bot && !message.guild) return;

    client.snipes.set(message.channel.id,{
        content:message.content,
        author:message.author.tag,
        image:message.attachments.first() ? message.attachments.first().proxyURL : null
});
});

client.on('messageDelete', async (message) => {
  if (message.content) {
    if (message.author.bot) return;
    simplydjs.ghostPing(message)
  }
});

const CurrencySystem = require("currency-system");
client.cs = new CurrencySystem;
CurrencySystem.cs.on('debug', (debug, error) => {
    console.log(debug);
    if (error) console.error(error);
});
client.cs.setMongoURL(client.settings.mongoSrv);
client.cs.setDefaultWalletAmount('500');
client.cs.setDefaultBankAmount('1000');
client.cs.setMaxBankAmount(10000000);
client.cs.setMaxWalletAmount(10000000);

client.on("guildMemberAdd", async member =>{
  const data = await welcomer.findOne({ Guild: member.guild.id });
    if (!data) return;

    if (!client.channels.cache.get(data.Channel)) return;

    const channel = client.channels.cache.get(data.Channel);
    
let image = await welcomeCanvas
      .setUsername(member.user.username)
      .setDiscriminator(member.user.discriminator)
      .setMemberCount(member.guild.memberCount)
      .setGuildName(member.guild.name)
      .setAvatar(member.user.displayAvatarURL({dynamic:false , format: 'jpg',size: 512}))
      .setColor("border", "#ff0000")
      .setColor("username-box", "#ff0000")
      .setColor("discriminator-box", "#ff0000")
      .setColor("message-box", "#ff0000")
      .setColor("title", "#ff0000")
      .setColor("avatar", "#ff0000")
      .setBackground("https://media.discordapp.net/attachments/773005768458764349/789056032767868929/9016087.jpg")
      .toAttachment();
       
    let attachment = new MessageAttachment(image.toBuffer(), "welcome-image.png");

    const welbed = new MessageEmbed()
    .setColor(client.config.color)
    .setDescription(`**• **ID: **${member.user.id}**\n**• **Bot: **${member.user.bot ? 'Yes' : 'No'}**\n**• **Created At: **${moment(member.user.createdAt).format('MMMM Do YYYY, H:mm:ss a')}**`)
     
    channel.send({ content: `Welcome ${member.user} To The Server`, embeds: [welbed], files: [attachment] });
});

const { DiscordTogether } = require('discord-together');
client.discordTogether = new DiscordTogether(client);

require("./handler")(client);
require("./utils/newEvents.js")(client);
require("./utils/client.js")(client);
require("./utils/logger.js");

client.token = process.env['token']

Levels.setURL(client.settings.mongoSrv);

client.login(process.env.token);