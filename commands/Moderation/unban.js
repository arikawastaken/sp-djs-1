const { Client, CommandInteraction, Permissions, MessageEmbed } = require("discord.js");
const { color, errorcolor, avatar } = require('../../configs/client.json');

module.exports = {
    name: "unban",
    description: "Unbans The Mentioned Member!",
    type: 'CHAT_INPUT',
    options: [
      {
        name: 'id',
        description: 'Unban Who ?',
        type: 'INTEGER',
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
        if (interaction.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
            if (interaction.guild.me.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
                const id = interaction.options.getInteger('id');
                const bannedUsers = await interaction.guild.bans.fetch();

            if (target.user.id === interaction.user.id) return interaction.followUp(`You Are Not Banned!`);
            if (target.user.id === interaction.guild.me.id) return interaction.followUp(`Im Not Banned!`);

            const user = bannedUsers.get(id).user;

            if (!user) return interaction.followUp('Unable To Find The Member!');

            let reason = 'No Reason While Unbanning';

            interaction.guild.members.unban(user, reason);

            const target = interaction.guild.members.find(id);

            const embed = new MessageEmbed()
            .setColor(color)
            .setTitle('Member Unbanned')
            .setDescription(`Successfully Unbanned ${target} In This Server!`)
            .setFooter(`Gadget - Unbanned By ${interaction.user.tag}`)
            .setThumbnail(avatar)

            interaction.followUp({ embeds: [embed] });
    } else {
client.error(interaction, "I Dont Have Permission To Use This Command! `BAN_MEMBERS`");
    }
        } else {
client.error(interaction, "You Dont Have Permission To Use This Command! `BAN_MEMBERS`");
        }
    },
};
