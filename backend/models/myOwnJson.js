const mongoose = require('mongoose');

const myOwnJsonSchema = mongoose.Schema({
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true },
  content: {}
}, {strict: false});

module.exports = mongoose.model('MyOwnJson', myOwnJsonSchema);
