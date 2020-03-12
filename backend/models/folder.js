const mongoose = require('mongoose');

const folder = mongoose.Schema({
  title: { type: String, required: true },
  hasPageSets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PageSet' }],
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true },
  hasParent: { type: mongoose.Schema.Types.ObjectId, ref: 'Folder' },
});

module.exports = mongoose.model('Folder', folder);
