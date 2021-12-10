const { Client, CommandInteraction, Permissions, MessageEmbed } = require("discord.js");
const { color, errorcolor, avatar } = require('../../configs/client.json');

module.exports = {
    name: "create-role",
    description: "Creates A Role In The Server!",
    type: 'CHAT_INPUT',
    options: [
      {
        name: 'name',
        description: 'Name For The Role!',
        type: 'STRING',
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
                const name = interaction.options.getString('name');
                const rColor = "RANDOM";

                let max = 20;

                if (name.length > max) return interaction.followUp('The Max Limit For Name Is 20 Characters!');

                try {
                  await interaction.guild.roles.create({ name: name, permissions: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES], color: rColor });
                } catch (e) {
                   interaction.followUp("Something Went Worng...")
                }

                const embed = new MessageEmbed()
                .setTitle('Role Created')
                .setColor(color)
                .setThumbnail(avatar)
                .setDescription(`Successfully Created Role With Name ${name}!`)
                .setFooter(`Gadget - Role Create`)

                interaction.followUp({ embeds: [embed] });

          client.modlogs({
            Member: 'its a role',
            Action: `Role Created - ${name}`,
            Color: color,
            Reason: reason,
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
