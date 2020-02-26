const mongoose = require('mongoose');

const subPageSchema = mongoose.Schema({
  title: { type: String },
  description: { type: String },
});

module.exports = mongoose.model('SubPage', subPageSchema);
