const mongoose = require('mongoose');

const actionSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  isFinished: { type: Boolean }, // isInProgress, isFinished
  deleted: { type: Boolean },
  type: { type: String },
  hasPages: { type: [String] }, // hash des pages
  hasPageSet: { type: String },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true }
});

module.exports = mongoose.model('Action', actionSchema);
