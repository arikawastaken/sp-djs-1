const { Schema, model } = require('mongoose');

module.exports = model('ticket-setup', new Schema({
    Guild: String,
    Category: String,
    Role: String,
   })
);