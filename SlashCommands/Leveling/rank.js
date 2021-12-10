const { Client, CommandInteraction, MessageAttachment } = require("discord.js");
const { color, errorcolor, avatar } = require('../../configs/client.json');
const Levels = require("discord-xp");
const canvacord = require("canvacord");
const Schema = require('../../models/leveling.js');

module.exports = {
    name: "rank",
    description: "Shows Your Rank In This Server!",
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
      Schema.findOne({
                Guild: interaction.guild.id
            }, async(err, data) => {
    if (!data) {
      interaction.followUp("Leveling System Is Not Enabled On This Server!");
    }
        if (data) {
            const rkuser = interaction.user;
            const trgt = await Levels.fetch(rkuser.id, interaction.guild.id);
            if (!trgt) return interaction.followUp('You Dont Have Any Levels On This Server!');

        const rank = new canvacord.Rank() // Build the Rank Card
        .setAvatar(rkuser.displayAvatarURL({format: 'png', size: 512}))
        .setCurrentXP(trgt.xp) // Current User Xp
        .setRequiredXP(Levels.xpFor(trgt.level + 1))
      .setLevel(trgt.level) // Current Level of the user
          .setProgressBar("#FFFFFF")
        .setUsername(rkuser.username)
        .setDiscriminator(rkuser.discriminator);

    rank.build()
        .then(data => {
        const attachment = new MessageAttachment(data, "YourRankCard.png");
        interaction.followUp({ files: [attachment] });
    });
  } else {
          return;
        }
      })
    }
}