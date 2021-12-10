const { Client, CommandInteraction, MessageEmbed, Permissions } = require("discord.js");
const { color, errorcolor, avatar } = require('../../configs/client.json');
const Schema = require('../../models/ghostping.js');

module.exports = {
    name: "gpdetector",
    description: "Enable/Disable Ghostping Detector System On This Server!",
    type: 'CHAT_INPUT',
    options: [
      {
        type: "SUB_COMMAND",
        name: "enable",
        description: "Enable Ghostping Detector System On This Server!"
      },
      {
        type: "SUB_COMMAND",
        name: "disable",
        description: "Disable Ghostping Detector System On This Server!"
      },
      {
        type: 'SUB_COMMAND',
        name: 'config',
        description: 'Shows Ghostping Detector System Config!'
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
                if (data) return interaction.followUp(`Ghostping Detector System Is Already Enabled In This Server!`);
                if (!data) {
                new Schema({
                    Guild: interaction.guild.id,
                    Enabled: true,
                }).save();
                const embed = new MessageEmbed()
                .setColor(color)
                .setTitle('Enabled Ghostping Detector')
                .setDescription(`Successfully Enabled Ghostping Detector System On This Server!`)
                .setFooter('Gadget - Detector System')
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
                if (!data) return interaction.followUp(`Ghostping Detector System Is Not Enabled In This Server!`);
                if (data) data.delete();
                const embed = new MessageEmbed()
                .setColor(color)
                .setTitle('Disabled Ghostping Detector')
                .setDescription(`Successfully Disabled Ghostping Detector System On This Server!`)
                .setFooter('Gadget - Detector System')
                interaction.followUp({ embeds: [embed] });
            });
        } else {
client.error(interaction, "You Dont Have Permission To Use This Command! `MANAGE_GUILD`");
        }
        }
        if (interaction.options.getSubcommand() === "config") {
      const embed = new MessageEmbed()
      .setTitle(`Ghostping Detector Configuration`)
      .setColor(color)
      .addFields(
		{ name: '/gpdetector enable', value: 'Enables Ghostping Detector System On This Server!' },
    { name: '/gpdetector disable', value: 'Disables Ghostping Detector System On This Server!' },
	)
  .setFooter(`Gadget - Detector Configuration`)

  interaction.followUp({ embeds: [embed] });

        }
    },
};
