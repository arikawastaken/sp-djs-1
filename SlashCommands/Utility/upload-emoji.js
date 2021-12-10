const { Client, CommandInteraction, Permissions, MessageEmbed, Util } = require("discord.js");
const { color, errorcolor, avatar } = require('../../configs/client.json');

module.exports = {
    name: "upload",
    description: "Upload Custom Emojis In This Server!",
    type: 'CHAT_INPUT',
    options: [
      {
        type: 'SUB_COMMAND',
        name: 'emoji',
        description: 'Uploads Provided Emoji/Stickers In This Server!',
        options: [
          {
          name: 'emoji',
          description: 'The Emoji To Upload!',
          type: 'STRING',
          required: true
          }
        ],
        }
    ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        if (interaction.member.permissions.has(Permissions.FLAGS.MANAGE_EMOJIS_AND_STICKERS)) {
            if (interaction.guild.me.permissions.has(Permissions.FLAGS.MANAGE_EMOJIS_AND_STICKERS)) {
                if (interaction.options.getSubcommand() === "emoji") {
                  const emoji = interaction.options.getString('emoji');

                  
                }
    } else {
client.error(interaction, "You Dont Have Permission To Use This Command! `MANAGE_EMOJIS`");
    }
        } else {
client.error(interaction, "You Dont Have Permission To Use This Command! `MANAGE_EMOJIS`");
        }
    },
};
