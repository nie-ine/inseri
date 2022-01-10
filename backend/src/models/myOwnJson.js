const mongoose = require('mongoose');

const myOwnJsonSchema = mongoose.Schema({
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true },
  content: {},
  published: { type: String }
}, {strict: false});

module.exports = mongoose.model('MyOwnJson', myOwnJsonSchema);
