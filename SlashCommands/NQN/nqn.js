const { Client, CommandInteraction, Permissions, MessageEmbed } = require("discord.js");
const { color, errorcolor, avatar } = require('../../configs/client.json');
const Schema = require('../../models/notquitenitro.js');

module.exports = {
    name: "nqn",
    description: "Enable/Disable NQN System On This Server!",
    type: 'CHAT_INPUT',
    options: [
      {
        type: 'SUB_COMMAND',
        name: 'enable',
        description: 'Enables NQN System On This Server!'
      },
      {
        type: 'SUB_COMMAND',
        name: 'disable',
        description: 'Disables NQN System On This Server!'
      },
      {
        type: 'SUB_COMMAND',
        name: 'config',
        description: 'Shows NQN System Configuration!'
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
                if (data) return interaction.followUp(`NQN System Is Already Enabled In This Server!`);
                if (!data) {
                new Schema({
                    Guild: interaction.guild.id,
                    Enabled: true,
                }).save();
                const embed = new MessageEmbed()
                .setColor(color)
                .setTitle('Enabled NQN')
                .setDescription(`Successfully Enabled NQN System On This Server!`)
                .setFooter('Gadget - NQN System')
                interaction.followUp({ embeds: [embed] });
                }
            });
        } else {
  client.error(interaction, "You Dont Have Permission To Use This Command! `MANAGE_GUILD`");
        }
        }
        if (interaction.options.getSubcommand() === "disable") {
        if (interaction.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) {
      Schema.findOne({
                Guild: interaction.guild.id
            }, async(err, data) => {
                if (!data) return interaction.followUp(`NQN System Is Not Enabled In This Server!`);
                if (data) data.delete();
                const embed = new MessageEmbed()
                .setColor(color)
                .setTitle('Disabled NQN')
                .setDescription(`Successfully Disabled NQN System On This Server!`)
                .setFooter('Gadget - NQN System')
                interaction.followUp({ embeds: [embed] });
            });
        } else {
client.error(interaction, "You Dont Have Permission To Use This Command! `MANAGE_GUILD`");
        }
        }
        if (interaction.options.getSubcommand() === "config") {
      const embed = new MessageEmbed()
      .setTitle(`NQN Configuration`)
      .setColor(color)
      .addFields(
		{ name: '/nqn enable', value: 'Enables NQN System On This Server!' },
    { name: '/nqn disable', value: 'Disables NQN System On This Server!' },
	)
  .setFooter(`Gadget - NQN Configuration`)

  interaction.followUp({ embeds: [embed] });

        }
    },
};
