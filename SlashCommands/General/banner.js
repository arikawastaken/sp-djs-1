const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { color, errorcolor, avatar } = require('../../configs/client.json');
const axios = require('axios');

module.exports = {
    name: "banner",
    description: "Shows Your Or Mentioned User's Banner!",
    type: 'CHAT_INPUT',
    options: [
      {
        name: 'member',
        description: 'Mention A User For Its Banner!',
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
          axios.get(`https://discord.com/api/users/${target.id}`, {
            headers: {
                Authorization: `Bot ${client.token}`,
            },
        }).then((res) => {
            const {
                banner,
                accent_color
            } = res.data

            if (banner) {
                const extension = banner.startsWith("a_") ? ".gif" : ".png";
                const url = `https://cdn.discordapp.com/banners/${target.id}/${banner}${extension}?size=2048`;

                const embed = new MessageEmbed()
                    .setTitle(`${target.tag}'s Banner`)
                    .setImage(url)
                    .setColor(color);

                interaction.followUp({
                    embeds: [embed]
                });
            } else {
                if (accent_color) {
                    const embed2 = new MessageEmbed()
                        .setDescription(`${target.tag} does not have a banner!'`)
                        .setColor(color);
                    interaction.followUp({
                        embeds: [embed2]
                    })
                } else {
                    interaction.followUp(`${target.tag} does not have a banner!`)
                }
            }
         })
        } else {
          const user = interaction.user;
          axios.get(`https://discord.com/api/users/${user.id}`, {
            headers: {
                Authorization: `Bot ${client.token}`,
            },
        }).then((res) => {
            const {
                banner,
                accent_color
            } = res.data

            if (banner) {
                const extension = banner.startsWith("a_") ? ".gif" : ".png";
                const url = `https://cdn.discordapp.com/banners/${user.id}/${banner}${extension}?size=2048`;

                const embed = new MessageEmbed()
                    .setTitle(`${user.tag}'s Banner`)
                    .setImage(url)
                    .setColor(color);

                interaction.followUp({
                    embeds: [embed]
                });
            } else {
                if (accent_color) {
                    const embed2 = new MessageEmbed()
                        .setDescription(`${user.tag} does not have a banner!'`)
                        .setColor(color);
                    interaction.followUp({
                        embeds: [embed2]
                    })
                } else {
                    interaction.followUp(`${user.tag} does not have a banner!`)
                }
            }
         })
        }...
    }
};