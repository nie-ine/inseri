const mongoose = require('mongoose');

const userGroup = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  users: [{type: String}],
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true },
});

module.exports = mongoose.model('userGroup', userGroup);
