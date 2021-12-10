const { Schema, model } = require('mongoose');

module.exports = model('blacklist', new Schema({
    Server: String,
   })
);