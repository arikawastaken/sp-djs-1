const { Client, CommandInteraction, Permissions, MessageEmbed } = require("discord.js");
const { color, errorcolor, avatar } = require('../../configs/client.json');

module.exports = {
    name: "remove-role",
    description: "Removes The Provided Role From Mentioned User!",
    type: 'CHAT_INPUT',
    options: [
      {
        name: 'member',
        description: 'Member To Remove Role!',
        type: 'USER',
        required: true
      },
      {
        name: 'role',
        description: 'Role That I Remove From The Member!',
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
        if (interaction.member.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) {
            if (interaction.guild.me.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) {
          const target = interaction.options.getMember('member');
          const trgtRole = interaction.options.getRole('role');

      if (target.roles.highest.position > interaction.member.roles.highest.position) return interaction.followUp({ content: `You Cannot Remove Role From ${target} Becouse They Have Higher Role Then You!` });
      if (interaction.user.id === target.user.id) return interaction.followUp(`You Cannot Remove Role From Yourself!`);
      if (!target.roles.cache.some(role => role.name === trgtRole.name)) return interaction.followUp(`They Dont Have That Role!`);
      
      try {
        target.roles.remove(trgtRole.id);
        const embed = new MessageEmbed()
        .setTitle('Role Removed')
        .setColor(color)
        .setThumbnail(avatar)
        .setDescription(`Successfully Removed ${trgtRole} From ${target}!`)
        .setFooter(`Gadget - Role Removed`)

        interaction.followUp({ embeds: [embed] });
      } catch (e) {
        interaction.followUp(`Something Went Worng ${e}`)
      }

          client.modlogs({
            Member: 'its a role',
            Action: `Role Removed - ${trgtRole.name}`,
            Color: color,
            Reason: 'No Reason Provided!',
            Moderator: interaction.user.tag
        }, interaction);
    } else {
client.error(interaction, "I Dont Have Permission To Use This Command! `MANAGE_ROLES`");
    }
        } else {
client.error(interaction, "You Dont Have Permission To Use This Command! `MANAGE_ROLES`");
        }
    },
};
