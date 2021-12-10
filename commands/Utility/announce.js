const { Client, CommandInteraction, Permissions, MessageEmbed } = require("discord.js");
const { color, errorcolor, avatar } = require('../../configs/client.json');

module.exports = {
    name: "announce",
    description: "Announces The Provided Text In A Specific/Current Channel!",
    type: 'CHAT_INPUT',
    options: [
      {
        name: 'message',
        description: 'Message To Announce',
        type: 'STRING',
        required: true
      },
      {
        name: 'channel',
        description: 'Channel To Announce The Text',
        type: 'CHANNEL',
        required: false
      }
    ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        if (interaction.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
            if (interaction.guild.me.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
                const channel = interaction.options.getChannel('channel');
                const text = interaction.options.getString('message');

                if (channel) {
                  const chEmbed = new MessageEmbed()
                  .setColor(color)
                  .setDescription(text)

                  try {
                      channel.send({ embeds: [chEmbed] });
                  } catch (e) {
                    interaction.followUp(`Something Went Worng.. Try Fixing My Permissions!`)
                  }
                  const msgEmbed = new MessageEmbed()
                  .setTitle('Announced')
                  .setColor(color)
                  .setThumbnail(avatar)
                  .setDescription(`Successfully Announced The Message In ${channel}`)
                  .setFooter(`Gadget - Announce Message`)

                  interaction.followUp({ embeds: [msgEmbed] });
                } else if (!channel) {
                const chEmbed = new MessageEmbed()
                  .setColor(color)
                  .setDescription(text)

                  interaction.followUp({ embeds: [chEmbed] });
                }
    } else {
client.error(interaction, "I Dont Have Permission To Use This Command! `MANAGE_MESSAGES`");
    }
        } else {
client.error(interaction, "You Dont Have Permission To Use This Command! `MANAGE_MESSAGES`");
        }
    },
};
