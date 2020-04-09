const mongoose = require('mongoose');

const folder = mongoose.Schema({
  title: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true },
  hasParent: { type: mongoose.Schema.Types.ObjectId, ref: 'Folder' },
  hasQueries: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Query' }],
  hasPageSets: [{id: { type: mongoose.Schema.Types.ObjectId, ref: 'PageSet' },title: {type: String}}],
  hasPages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Page' }],
  hasFiles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'File' }],
});

module.exports = mongoose.model('Folder', folder);
