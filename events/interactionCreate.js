const client = require("../bot.js");
const Levels = require('discord-xp');
const lschema = require('../models/leveling.js');
const { MessageEmbed } = require('discord.js');
const blacklist = require('../models/blacklist');

client.on("interactionCreate", async (interaction) => {
      lschema.findOne({
                Guild: interaction.guild.id
            }, async(err, data) => {
    if (!data) {
      return;
    }
        if (data) {
          const randomXP = Math.floor(Math.random() * 10) +1;
        const hasLeveledUP = await Levels.appendXp(interaction.user.id, interaction.guild.id, randomXP);
        if (hasLeveledUP) {
          const user = await Levels.fetch(interaction.user.id, interaction.guild.id);
          interaction.followUp(`${interaction.member} You Have Been Leveled Up To Level ${user.level}`);
        }
  } else;
      });
    // Slash Command Handling
    if (interaction.isCommand()) {
      if (!interaction.guild && interaction.user.bot) return;

        await interaction.deferReply({ ephemeral: false }).catch(() => {});

        const cmd = client.commands.get(interaction.commandName);
        if (!cmd)
            return interaction.followUp({ content: "An error has occured " });

        const args = [];

        for (let option of interaction.options.data) {
            if (option.type === "SUB_COMMAND") {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }
        interaction.member = interaction.guild.members.cache.get(interaction.user.id);

        const blacklisted = await blacklist.findOne({ Server: interaction.guild.id });
        const blEmbed = new MessageEmbed()
        .setTitle(`Server Is Blacklisted`)
        .setColor(client.config.color)
        .setThumbnail(client.config.avatar)
        .setDescription(`This Server Is Blacklisted By The Bot Owner, If You Think This Is A Mistake So Please Contect The Bot Owner Or Join Our Support Server!`)
        .setFooter(`Gadget - Server Is Blacklisted`)
        if (blacklisted) interaction.followUp({ embeds: [blEmbed] }); 

        try {
        if (!blacklisted) cmd.run(client, interaction, args);
        } catch (e) {
          console.log(e)
        }
    }

    // Context Menu Handling
    if (interaction.isContextMenu()) {
        await interaction.deferReply({ ephemeral: false });
        const command = client.commands.get(interaction.commandName);
        if (!command) return;
        command.run(client, interaction);
    }
});
