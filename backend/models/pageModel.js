const mongoose = require('mongoose');

const pageSchema = mongoose.Schema({
  title: { type: String },
  description: { type: String }
});

module.exports = mongoose.model('Page', pageSchema);
