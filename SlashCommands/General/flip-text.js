const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { color, errorcolor, avatar } = require('../../configs/client.json');
const flip = require("flip-text");

module.exports = {
    name: "flip-text",
    description: "Flips The Provided Text!",
    type: 'CHAT_INPUT',
    options: [
      {
        name: 'message',
        description: 'The Text To Flip!',
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
        const text = interaction.options.getString('message');
        
        if (text.length > client.max_input) return interaction.followUp(`The Max Text Input Limit Is 20 Characters!`);

  let flipped = [];
   args.forEach((arg) => {
    flipped.push(flip(arg));
   });

   const embed = new MessageEmbed()
   .addField(`Flipped Text`, "```" + flipped.join(" ") + "```")
   .setColor(color)

   interaction.followUp({ embeds: [embed] });
    },
};
