const { Client, CommandInteraction, Permissions, MessageEmbed } = require("discord.js");
const { color, errorcolor, avatar, clientId } = require('../../configs/client.json');
const warndb = require('../../models/warndb');

module.exports = {
    name: "warn",
    description: "Warns The Mentioned Member For Specified Reason!",
    type: 'CHAT_INPUT',
    options: [
      {
        name: 'member',
        description: 'Member To Warn ?',
        type: 'USER',
        required: true
      },
      {
        name: 'reason',
        description: 'Reason For Warn ?',
        type: 'STRING',
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
        if (interaction.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) {
            if (interaction.guild.me.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) {
                const target = interaction.options.getMember('member');
                const reason = interaction.options.getString('reason') || 'No Reason Provided';

                if (target.user.id === interaction.user.id) return interaction.followUp(`I Cannot Warn You!`);
                if (target.user.id === clientId) return interaction.followUp(`You Cannot Warn Me!`);

                warndb.findOne({
            guild: interaction.guild.id,
            user: target.user.id
        }, async (err, data) => {
            if (err) throw err;
            if (!data) {
                data = new warndb({
                    guild: interaction.guild.id,
                    user: target.user.id,
                    content: [{
                        moderator: interaction.user.id,
                        reason: reason
                    }]
                })
            } else {
                const object = {
                    moderator: interaction.user.id,
                    reason: reason
                }
                data.content.push(object)
            }
            data.save()

        });

        const embed = new MessageEmbed()
        .setTitle('Member Warned')
        .setColor(color)
        .setThumbnail(avatar)
        .setDescription(`${target} Has Been Warned!\nReason: ${reason}`)
        .setFooter(`Gadget - Warn Member`)

        interaction.followUp({ embeds: [embed] });

      const sendUser = new MessageEmbed()
            .setColor(color)
            .setDescription(`You Have Been Warned In ${interaction.guild.name}! \nReason: ${reason}`)

            try {
              await target.send({ embeds: [sendUser] });
            } catch (e) {
              return;
            }

          client.modlogs({
            Member: target.user.tag,
            Action: 'Member Warned',
            Color: color,
            Reason: reason,
            Moderator: interaction.user.tag
        }, interaction);
    } else {
client.error(interaction, "I Dont Have Permission To Use This Command! `MANAGE_GUILD`");
    }
        } else {
client.error(interaction, "You Dont Have Permission To Use This Command! `MANAGE_GUILD`");
        }
    },
};
