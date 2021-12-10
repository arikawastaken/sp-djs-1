const { Client, CommandInteraction, MessageEmbed, Permissions } = require("discord.js");
const { color, errorcolor, avatar } = require('../../configs/client.json');
const Schema = require('../../models/ticket.js');
const simplydjs = require('simply-djs');

module.exports = {
    name: "ticket",
    description: "Ticket Commands For This Server Admins/Members!",
    type: 'CHAT_INPUT',
    options: [{
      type: 'SUB_COMMAND',
      name: 'setup',
      description: 'Setup The Ticket Panel For Your Server!',
      options: [{
        name: 'category-id',
        description: 'Id Of The Category ?',
        type: 'STRING',
        required: true,
      }, {
        name: 'support-role',
        description: 'Who Can Access The Tickets ?',
        type: 'ROLE',
        required: true,
      }]
    }, {
      type: 'SUB_COMMAND',
      name: 'panel',
      description: 'Creates A Ticket Panel In The Channel!'
    }],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        if (interaction.options.getSubcommand() === "setup") {
          if (interaction.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) {
            const category = interaction.options.getString('category-id');
            const support = interaction.options.getRole('support-role');

            if (!interaction.guild.channels.cache.find(cat=> cat.id === category)) return interaction.followUp(`Please Provide A Vaild Category ID!`);
            let ctg = interaction.guild.channels.cache.find(cat=> cat.id === category);

            Schema.findOne({
                Guild: interaction.guild.id
            }, async(err, data) => {
                if (data) data.delete();
                new Schema({
                    Guild: interaction.guild.id,
                    Category: category,
                    Role: support.id,
                }).save();
                const embed = new MessageEmbed()
                .setColor(color)
                .setTitle('Ticket Setup')
                .setDescription(`Successfully Setuped Ticket System On This Server! \nTip: Create Ticket Panel Using /ticket panel`)
                .setFooter('Gadget - Ticket System')
                interaction.followUp({ embeds: [embed] });
            });
          } else {
            client.error(interaction, "You Dont Have Permission To Use This Command! `MANAGE_GUILD`");
          }
        } else if (interaction.options.getSubcommand() === "panel") {
          if (interaction.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) {
              Schema.findOne({
                Guild: interaction.guild.id
            }, async(err, data) => {
    if (!data) {
      interaction.followUp("Ticket System Is Not Setup On This Server!");
    }
        if (data) {
simplydjs.ticketSystem(interaction, interaction.channel, {
  slash: true,
  embedDesc: 'Click The Button To Create A Ticket!', // default: '🎫 Create a ticket by clicking the button 🎫'
  embedColor: color, // default: #075FFFF
  embedFoot: 'Gadget - Ticket System', // default: message.guild.name
  emoji: '🎫', // default:, 🎫
  color: 'SECONDARY',
  credit: false // default: blurple
})
  } else {
          return;
        }
      })
          } else {
           client.error(interaction, "You Dont Have Permission To Use This Command! `MANAGE_GUILD`");
          }
        }
    },
};
