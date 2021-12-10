const { Client, CommandInteraction, Permissions, MessageEmbed } = require("discord.js");
const { color, errorcolor, avatar } = require('../../configs/client.json');
const warndb = require('../../models/warndb');
const moment = require('moment');
const { stripIndent } = require('common-tags');

module.exports = {
    name: "warnings",
    description: "Sends List Of Warnings Of Specified Member!",
    type: 'CHAT_INPUT',
    options: [
      {
        name: 'member',
        description: 'List Warnings Of ?',
        type: 'USER',
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
      const user = interaction.options.getMember('member');

      warndb.findOne({
            guild: interaction.guild.id, 
            user: user.id
        }, async (err, data) => {
            if (err) throw err
            if (data) {
                const e = data.content.map(
                    (w, i) => `\n${i + 1} - Moderator: ${interaction.guild.members.cache.get(w.moderator).user.tag}, Reason: ${w.reason}`
                )
const warns = stripIndent`
       ${e.join(' ')}
 `;

                const embed = new MessageEmbed()
                    .setTitle(`List Of Warnings`)
                    .addField('**Warnings**:', `\`\`\`asciidoc\n${warns}\`\`\``)
                    .setColor(color)
                    .setFooter(`Gadget - List Warnings`)
                interaction.followUp({
                    embeds: [embed]
                })
            } else {
                interaction.followUp('This user does not have any warnings!')
            }
        });
    },
};
