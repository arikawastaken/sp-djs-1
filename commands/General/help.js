const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { color, errorcolor, avatar } = require('../../configs/client.json');
const {
    readdirSync
} = require("fs");
const prefix = '/';
const create_mh = require(`../../utils/menu.js`);

module.exports = {
    name: "help",
    description: "Shows All Commands With Selection Menu!",
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
      let categories = [];
        let cots = [];

        if (!args[0]) {

            //categories to ignore
            let ignored = [
                "Owner"
            ];

            const emo = {

                fun: ":video_game:",
                ticket: ":ticket:",
                utility: ":gear:",
                moderation: ":tools:" // emojis for the categories
            }

            let ccate = [];
            //gets all the folders and commands
            readdirSync("./commands/").forEach((dir) => {
                if (ignored.includes(dir.toLowerCase())) return;
                const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
                    file.endsWith(".js")
                );

                if (ignored.includes(dir.toLowerCase())) return;

                const name = `${emo[dir]} - ${dir}`;
                //let nome = dir.charAt(0).toUpperCase() + dir.slice(1).toLowerCase();
                let nome = dir.toUpperCase();

                let cats = new Object();

                //this is how it will be created as
                cats = {
                    name: name,
                    value: `\n\`${prefix}help ${dir.toLowerCase()}\``,
                    inline: true
                }


                categories.push(cats);
                ccate.push(nome);
            });
            //embed
            const embed = new MessageEmbed()
                .setTitle(`Gadget's Help Desk`)
                .setDescription(`>>> Please Select A Category From Menu`)
                .addFields(
                  { name: 'General', value: 'The Main Commands Of The Sparky To Manage Your Server' },
                  { name: 'Utility', value: 'The Utility Commands Of Sparky To Make Your Dream Server' },
                  { name: 'Moderation', value: 'The Moderation Commands To Keep Your Server Clean' },
                  { name: 'Music', value: 'The Music Commands For The People Who Love Songs' },
                  { name: 'Leveling', value: 'The Leveling System To Keep Your Server Active' },
                  { name: 'Giveaway', value: 'The Giveaway System To Host A Giveaway' },
                  { name: 'Owner', value: 'The Owner Only Commands For Glory (Bot Owner)' },
                  { name: 'Modlogs', value: 'The Logging System To Log Actions In A Channel!' },
                  { name: 'Chatbot', value: 'The Chatbot System Let You Make Yourself Happy!' },
                  { name: 'Economy', value: 'The Global Economy System Let You Earn And Trade!' },
                  { name: 'NQN', value: 'The NQN System Let Non-Nitro Users Use Anminated Emojis!' },
                  { name: 'Backups', value: 'The Backup System To Create A Full Backup Of Your Server!' },
                  { name: 'Welcomer', value: 'The Welcome System To Greet New Members!' },
                  { name: 'Together', value: 'Let You Watch Youtube Videos With Your Firends On Discord!' },
                  { name: 'Autorole', value: 'Let New Members Of Your Server Get A Specific Role!' },
                )
                .setFooter(`Gadget - Help Desk`)
                .setTimestamp()
                .setColor(color)

//creating the dropdown menu
            let menus = create_mh(ccate);
            return interaction.followUp({
                embeds: [embed],
                components: menus.smenu
            }).then((msgg) => {

                const menuID = menus.sid;

                const select = async (interaction) => {
                    if (interaction.customId != menuID) return;

                    let {
                        values
                    } = interaction;

                    let value = values[0];

                    let catts = [];

                    readdirSync("./commands/").forEach((dir) => {
                        if (dir.toLowerCase() !== value.toLowerCase()) return;
                        const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
                            file.endsWith(".js")
                        );


                        const cmds = commands.map((command) => {
                            let file = require(`../../commands/${dir}/${command}`); //getting the commands again

                            if (!file.name) return "No command name.";

                            let name = file.name.replace(".js", "");

                            if (client.commands.get(name).hidden) return;

                            let des = client.commands.get(name).description;
                            let emo = client.commands.get(name).emoji;
                            let emoe = emo ? `${emo} - ` : ``;

                            let obj = {
                                cname: `**${name}**`,
                                des
                            }

                            return obj;
                        });

                        let dota = new Object();

                        cmds.map(co => {
                            if (co == undefined) return;

                            dota = {
                                name: `${cmds.length === 0 ? "In progress." : co.cname}`,
                                value: co.des ? co.des : `No Description`,
                                inline: false,
                            }
                            catts.push(dota)
                        });

                        cots.push(dir.toLowerCase());
                    });

                    if (cots.includes(value.toLowerCase())) {
                        const combed = new MessageEmbed()
                            .setTitle(`${value.charAt(0).toUpperCase() + value.slice(1)} COMMANDS`)
                            .setDescription(">>> Gadget Is Using Slash Commands (`/`)")
                            .addFields(catts)
                            .setColor(color)
                            .setFooter(`Gadget - Help Desk`)

                        await interaction.deferUpdate();

                        return interaction.editReply({
                            embeds: [combed],
                            components: menus.smenu
                        })
                    };

                };

                const filter = (interaction) => {
                    return !interaction.user.bot && interaction.user.id == interaction.user.id
                };

                const collector = msgg.createMessageComponentCollector({
                    filter,
                    componentType: "SELECT_MENU"
                });
                collector.on("collect", select);
                collector.on("end", () => null);

            });

        }
    }
}