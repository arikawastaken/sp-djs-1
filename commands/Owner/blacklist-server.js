const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { color, errorcolor, avatar, ownerId } = require('../../configs/client.json');
const schema = require('../../models/blacklist.js');

module.exports = {
    name: "blacklist-server",
    description: "Blacklists The Specified Server!",
    type: 'CHAT_INPUT',
    options: [
      {
        name: 'id',
        description: 'Id Of The Server!',
        type: 'STRING',
        required: true
      }
    ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        if (interaction.user.id === ownerId) {
          const blackid = interaction.options.getString('id');

          if (!client.guilds.cache.has(blackid)) return interaction.followUp('Im Not In That Server!');

          schema.findOne({ Server: blackid }, async(err, data) => {
               if (data) return interaction.followUp('That Server Is Already Blacklisted!');
               if (!data) {
                 new schema({
                   Server: blackid
               }).save();
               const embed = new MessageEmbed()
               .setColor(color)
               .setThumbnail(avatar)
               .setTitle('Blacklisted Server')
               .setDescription(`Successfully Blacklisted That Server/Guild!`)
               .setFooter('Gadget - Blacklisted Server')
               interaction.followUp({ embeds: [embed] });
               }
           });
        } else if (interaction.user.id !== ownerId) {
client.error(interaction, "This Is A Owneronly Command!");
        }
    },
};
