const { Schema, model } = require('mongoose');

module.exports = model('level-enable', new Schema({
    Guild: String,
    Enabled: String,
   })
);