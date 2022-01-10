const mongoose = require('mongoose');

const file = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  urlPath: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true },
  //normalizedFileName: {type: String, required: true},
  uploadedOn: {type: Date, default: Date.now},
});

module.exports = mongoose.model('File', file);
