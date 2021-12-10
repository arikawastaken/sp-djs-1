const client = require("../bot.js");
const chalk = require('chalk');
const moment = require('moment');
const mongoose = require('mongoose');

client.on("ready", async () => {
   mongoose.connect(client.serverConfig.mongoSrv, { useNewUrlParser: true, useUnifiedTopology: true, }).then(() => console.log(chalk.blue(`[GADGET] Connected To Mongoose Database!`)));
});