const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { color, errorcolor, avatar } = require('../../configs/client.json');

module.exports = {
    name: "avatar",
    description: "Shows Your Or Mentioned User's Avatar!",
    type: 'CHAT_INPUT',
    options: [
      {
        name: 'member',
        description: 'Mention A User For Its Avatar!',
        type: 'USER',
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
        const target = interaction.options.getUser('member');
        if (target) {
          const embed = new MessageEmbed()
            .setTitle(`${target.tag}'s Avatar`)
            .setImage(target.displayAvatarURL({
                dynamic: true,
                size: 1024
            }))
       .setFooter(`Gadget - Requested By ${interaction.user.username}`, interaction.user.displayAvatarURL({ dynamic: true }));
        
        await interaction.followUp({
            embeds: [embed]
        });
        } else {
            const embed = new MessageEmbed()
            .setTitle(`${interaction.user.tag}'s Avatar`)
            .setImage(interaction.user.displayAvatarURL({
                dynamic: true,
                size: 1024
            }))
            .setDescription(`[PNG](${interaction.user.avatarURL({ format: 'png' })}) | [Webp](${interaction.user.avatarURL({ dynamic: true })}) | [JPG](${interaction.user.avatarURL({ format: 'jpg' })})`)
            .setFooter(`Gadget - Requested By ${interaction.user.username}`, interaction.user.displayAvatarURL({ dynamic: true }));
        
        await interaction.followUp({
            embeds: [embed]
        });
        }
    },
};
