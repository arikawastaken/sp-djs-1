const { Schema, model } = require('mongoose');

module.exports = model('notquitenitro', new Schema({
    Guild: String,
    Enabled: String,
   })
);