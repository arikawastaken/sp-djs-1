const chalk = require(`chalk`);
const {
    MessageSelectMenu,
    MessageActionRow
} = require(`discord.js`);
const emojis = require("../configs/custom_emojis.js");
const ces = require("../configs/emojis.js");

/* MENU CREATOR */
/**
 * @param {Array} array - The array of options (rows to select) for the select menu
 * @returns MessageSelectMenu
 */

const create_mh = (
    array
) => {

    if (!array) throw new Error(chalk.red.bold(`The options were not provided! Make sure you provide all the options!`));
    if (array.length < 0) throw new Error(chalk.red.bold(`The array has to have atleast one thing to select!`));
    let select_menu;

    let id = `help-menus`;

    let menus = [];

 const emo = {
  general: emojis.general,
  moderation: emojis.mod,
  music: emojis.music,
  utility: emojis.utility,
  owner: emojis.owner,
  giveaway: emojis.giveaway,
  leveling: emojis.leveling,
  settings: emojis.manage,
  backup: emojis.backup,
  welcomer: emojis.welcomer,
  economy: emojis.economy,
  together: emojis.youtube,
  modlogs: emojis.modlogs,
  chatbot: emojis.chatbot,
  nqn: emojis.nqn,
  autorole: emojis.autorole
 };
 const desc = {
   general: 'The Main Commands Of Gadget Discord Bot!',
   moderation: 'The Moderation Commands To Keep Your Server Clean!',
   music: 'The Music Commands For The People Who Love Music!',
   utility: 'The Utility Commands For Server Members!!',
   owner: 'The Owner Commands Only For Glory (Bot Owner)!',
   giveaway: 'The Giveaway Commmands To Host A Giveaway!',
   leveling: 'The Leveling Commands To Make Ranking System!',
   backup: "The Backup System To Create Complete Backups!",
   autorole: "A Autorole Systen To Add Roles To New Members!",
   modlogs: "A Logging System To Log Actions Happen Of Your Server!",
   chatbot: "A System Which Can Talk To Anyone And Make Them Happy!",
   nqn: "Let No-Nitro Users Enjoy Anminated Emojis Without Nitro!",
   welcomer: "A Welcome System To Greet New Members In A Channel!",
   economy: "A Global Economy System Let You Earn Gons And Trade!",
   together: "Let You Watch Yotube Videos With Your Firends On Discord!"
 }

    // now lets run it
    array.forEach(cca => {
        let name = cca;
        let sName = `${name.toUpperCase()}`
        let tName = name.toLowerCase();
        let fName = name.toUpperCase();

        return menus.push({
            label: `${sName}`,
            value: fName,
            description: `${desc[name.toLowerCase()] || "none"}`,
            emoji: `${emo[name.toLowerCase()] || "❔"}`,
        })
    });

    let chicken = new MessageSelectMenu()
        .setCustomId(id)
        .setPlaceholder(`Select a Command Category`)
        .addOptions(menus)

    select_menu = new MessageActionRow()
        .addComponents(
            chicken
        );


    return {
        smenu: [select_menu],
        sid: id
    }
}

module.exports = create_mh;