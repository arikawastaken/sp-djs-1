const { Client, CommandInteraction, Permissions, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { color, errorcolor, avatar } = require('../../configs/client.json');

module.exports = {
    name: "nuke",
    description: "Nukes The Current Channel Or A Specified Channel!",
    type: 'CHAT_INPUT',
    options: [
      {
        type: "SUB_COMMAND",
        name: 'channel',
        description: 'Nukes The Current Channel!'
      }
    ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        if (interaction.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) {
            if (interaction.guild.me.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) {
              if (!interaction.channel.deletable) return interaction.followUp('This Channel Is Not Deletable!');

                  const embed = new MessageEmbed()
                  .setTitle("Nuke Channel")
                  .setDescription("Are You Sure You Want To Nuke The Channel?")
                  .setColor(color)
                  .setThumbnail(avatar)
                  .setFooter("Gadget - Nuke Channel");
                  
                const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('yes')
					.setLabel('Yes, Im Sure')
					.setStyle('DANGER'),
        new MessageButton()
					.setCustomId('no')
					.setLabel('No, Im Not Sure')
					.setStyle('SECONDARY'),
			);

      interaction.followUp({ embeds: [embed], components: [row] });

      const filter = i => i.customId === 'yes' && i.user.id === interaction.user.id;
      const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

      collector.on('collect', async i => {
	      if (i.customId === 'yes') {
          const yesembed = new MessageEmbed()
            .setColor(color)
            .setTitle('Channel Nuked')
            .setDescription(`The Channel Has Been Nuked By ${interaction.user}!`)
            .setImage('https://media.giphy.com/media/LH7QWqFeBndZVnEmLn/giphy.gif')
            .setFooter('Gadget - Channel Nuked')
		 interaction.channel.clone().then(channel => channel.send({ embeds: [yesembed] }));
     interaction.channel.delete();
	}
});

      const fltr = i => i.customId === 'no' && i.user.id === interaction.user.id;
      const cltr = interaction.channel.createMessageComponentCollector({ fltr, time: 15000 });

      cltr.on('collect', async i => {
	      if (i.customId === 'no') {
		await i.update({ content: 'Cancelled Nuking The Channel!', components: [], embeds: [] });
	}
});
    } else {
client.error(interaction, "I Dont Have Permission To Use This Command! `MANAGE_CHANNELS`");
    }
        } else {
client.error(interaction, "You Dont Have Permission To Use This Command! `MANAGE_CHANNELS`");
        }
    },
};
