const { Schema, model } = require('mongoose');

module.exports = model('ghostping-detector', new Schema({
    Guild: String,
    Enabled: String,
   })
);