const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { color, errorcolor, avatar } = require('../../configs/client.json');

module.exports = {
    name: "snipe",
    description: "Snipe's The Current Deleted Message!",
    type: 'CHAT_INPUT',
    options: [
      {
        type: 'SUB_COMMAND',
        name: 'message',
        description: 'Snipes The Current Deleted Message!'
      }
    ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const msg = client.snipes.get(interaction.channel.id);
        if(!msg) return interaction.followUp("There Is No Deleted Message!");

        try {

        if (msg) {
         const embed = new MessageEmbed()
        .setAuthor(msg.author, interaction.user.displayAvatarURL({ dynamic: true }))
        .addField('Content:', msg.content)
        .setColor(color)
        .setFooter("Gadget - Requested By " + interaction.user.tag)
        if(msg.image)embed.setImage(msg.image)

        interaction.followUp({ embeds: [embed] });
        }
        } catch (e) {
          console.log(e)
          interaction.followUp(`Something Went Worng!`)
        }
    },
};
