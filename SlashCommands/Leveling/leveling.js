const { Client, CommandInteraction, MessageEmbed, Permissions } = require("discord.js");
const { color, errorcolor, avatar } = require('../../configs/client.json');
const Schema = require('../../models/leveling.js');

module.exports = {
    name: "ranking",
    description: "Enable/Disable Ranking System On This Server!",
    type: 'CHAT_INPUT',
    options: [
      {
        type: "SUB_COMMAND",
        name: "enable",
        description: "Enable Leveling System On This Server!"
      },
      {
        type: "SUB_COMMAND",
        name: "disable",
        description: "Disable Leveling System On This Server!"
      },
      {
        type: 'SUB_COMMAND',
        name: 'config',
        description: 'Shows Ranking System Config!'
      }
    ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        if (interaction.options.getSubcommand() === "enable") {
          if (interaction.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) {
      Schema.findOne({
                Guild: interaction.guild.id
            }, async(err, data) => {
                if (data) return interaction.followUp(`Ranking System Is Already Enabled In This Server!`);
                if (!data) {
                new Schema({
                    Guild: interaction.guild.id,
                    Enabled: true,
                }).save();
                const embed = new MessageEmbed()
                .setColor(color)
                .setTitle('Enabled Ranking')
                .setDescription(`Successfully Enabled Ranking System On This Server!`)
                .setFooter('Gadget - Ranking System')
                interaction.followUp({ embeds: [embed] });
                }
            });
        } else {
            const noperms = new MessageEmbed()
client.error(interaction, "You Dont Have Permission To Use This Command! `MANAGE_GUILD`");
        }
        }
        if (interaction.options.getSubcommand() === "disable") {
        if (interaction.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) {
      Schema.findOne({
                Guild: interaction.guild.id
            }, async(err, data) => {
                if (!data) return interaction.followUp(`Ranking System Is Not Enabled In This Server!`);
                if (data) data.delete();
                const embed = new MessageEmbed()
                .setColor(color)
                .setTitle('Disabled Ranking')
                .setDescription(`Successfully Disabled Ranking System On This Server!`)
                .setFooter('Gadget - Ranking System')
                interaction.followUp({ embeds: [embed] });
            });
        } else {
client.error(interaction, "You Dont Have Permission To Use This Command! `MANAGE_GUILD`");
        }
        }
        if (interaction.options.getSubcommand() === "config") {
      const embed = new MessageEmbed()
      .setTitle(`Ranking Configuration`)
      .setColor(color)
      .addFields(
		{ name: '/ranking enable', value: 'Enables Ranking System On This Server!' },
    { name: '/ranking disable', value: 'Disables Ranking System On This Server!' },
	)
  .setFooter(`Gadget - Ranking Configuration`)

  interaction.followUp({ embeds: [embed] });

        }
    },
};
