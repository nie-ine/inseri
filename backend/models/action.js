const mongoose = require('mongoose');

const actionSchema = mongoose.Schema({
  title: String,
  description: String,
  isFinished: Boolean, // isInProgress, isFinished
  deleted: Boolean,
  type: String,
  hasViews: [String], // hash des views
  hasEdition: String
});

module.export = mongoose.model('Action', actionSchema);
