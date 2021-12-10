const { Client, CommandInteraction, Permissions, MessageEmbed } = require("discord.js");
const { color, errorcolor, avatar, ownerId } = require('../../configs/client.json');

module.exports = {
    name: "sudo",
    description: "Sends A Message As A User!",
    type: 'CHAT_INPUT',
    options: [
      {
        name: 'user',
        description: 'Mention A User!',
        type: 'USER',
        required: true
      },
      {
        name: 'text',
        description: 'Specify A Text!',
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
          const member = interaction.options.getUser("user");
          const text = interaction.options.getString("text");

 interaction.channel.createWebhook(member.username, {
     avatar: member.displayAvatarURL({dynamic: true})
 }).then(webhook => {
     webhook.send(args.slice(1).join(' '))
     setTimeout(() => {
         webhook.delete()        
     }, 3000)
  });
  interaction.followUp('Why are you hacking him lol!');
    } else {
client.error(interaction, "This Is A Owneronly Command!");
    }
    },
};
