const mongoose = require('mongoose');

const userGroup = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  users: [{type: String}],
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true },
  hasPages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Page' }],
  hasPageSets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PageSet' }],
});

module.exports = mongoose.model('userGroup', userGroup);
