const { Schema, model } = require('mongoose');

module.exports = model('suggest-config', new Schema({
    Guild: String,
    Channel: String,
   })
);