const { Client, CommandInteraction, Permissions, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { color, errorcolor, avatar } = require('../../configs/client.json');

module.exports = {
    name: "purge",
    description: "Deletes The Provided Amount Of Messages!",
    type: 'CHAT_INPUT',
    options: [
      {
        name: 'messages',
        description: 'The Amount OF Messages To Delete!',
        type: "INTEGER",
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
        if (interaction.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
            if (interaction.guild.me.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
                try {
               const amount = interaction.options.getInteger('messages');

                  let max = 99
                  let min = 1

                  if (amount < min) return interaction.followUp(`You Have To Delete Atleast 3 Messages!`);
                  if (amount > max) return interaction.followUp('Sorry! I Cannot Delete More Then 99 Messages!');

                  const embed = new MessageEmbed()
                  .setTitle("Confirmation")
                  .setDescription(`Do You Really Want To Delete ${amount} Messages!`)
                  .setColor(color)
                  .setThumbnail(avatar)
                  .setFooter("Gadget - Purge Messages");
                  
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
          await interaction.channel.bulkDelete(parseInt(amount) + 1, true);

                  const embed = new MessageEmbed()
                  .setTitle('Purged Messages')
                  .setColor(color)
                  .setThumbnail(avatar)
                  .setDescription(`Deleted ${amount} Messages!`)
                  .setFooter('Gadget - Purge Messages')

                  setTimeout(() => {
                    interaction.channel.send({ embeds: [embed] });
                }, 2000)
	}
});

      const fltr = i => i.customId === 'no' && i.user.id === interaction.user.id;
      const cltr = interaction.channel.createMessageComponentCollector({ fltr, time: 15000 });

      cltr.on('collect', async i => {
	      if (i.customId === 'no') {
		await i.update({ content: 'Cancelled Purging The Messages!', components: [], embeds: [] });
	}
});
                } catch (e) {
                  interaction.followUp(`Something Went Worng... ${e}`)
                }
    } else {
client.error(interaction, "I Dont Have Permission To Use This Command! `MANAGE_MESSAGES`");
    }
        } else {
client.error(interaction, "You Dont Have Permission To Use This Command! `MANAGE_MESSAGES`");
        }
    },
};
