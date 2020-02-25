const mongoose = require('mongoose');

const subPageSchema = mongoose.Schema({
  title: { type: String },
  description: { type: String },
  page_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Page', require: true }
});

module.exports = mongoose.model('subPage', subPageSchema);
