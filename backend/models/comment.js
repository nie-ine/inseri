const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
  commentText: { type: String, required: true },
  page: { type: mongoose.Schema.Types.ObjectId, ref: 'Page' },
  action: { type: mongoose.Schema.Types.ObjectId, ref: 'Action' },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true },
  date: { type: String, required: true },
  params: {}
});

module.exports = mongoose.model('Comment', commentSchema);
