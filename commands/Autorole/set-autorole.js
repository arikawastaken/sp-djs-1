const { Client, CommandInteraction, Permissions, MessageEmbed } = require("discord.js");
const { color, errorcolor, avatar } = require('../../configs/client.json');
const schema = require('../../models/autorole.js')

module.exports = {
    name: "set-autorole",
    description: "Sets The Join Role For New Members!",
    type: 'CHAT_INPUT',
    options: [
      {
        name: 'role',
        description: 'Role For New Members!',
        type: 'ROLE',
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
        if (interaction.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) {
            if (interaction.guild.me.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) {
                const role = interaction.options.getRole('role');

                schema.findOne({
            guild: interaction.guild.id
        }, async (err, data) => {
            if (err) throw err
            if (data) {
                data.delete();
            } else {
                data = new schema({
                    guild: interaction.guild.id,
                    role: role.id
                })
                await data.save();
          const saveEmbed = new MessageEmbed()
            .setColor(color)
            .setTitle('Autorole')
            .setDescription(`Successfully Set ${role} As Autorole!`)
            .setThumbnail(avatar)
            .setFooter('Gadget - Autorole')
        interaction.followUp({
            embeds: [saveEmbed]
        });
            }
        })
    } else {
client.error(interaction, "I Dont Have Permission To Use This Command! `MANAGE_GUILD`");
    }
        } else {
client.error(interaction, "You Dont Have Permission To Use This Command! `MANAGE_GUILD`");
        }
    },
};
