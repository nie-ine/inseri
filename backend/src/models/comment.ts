import { Schema, model } from 'mongoose';

const commentSchema = new Schema({
  commentText: { type: String, required: true },
  page: { type: Schema.Types.ObjectId, ref: 'Page' },
  action: { type: Schema.Types.ObjectId, ref: 'Action' },
  creator: { type: Schema.Types.ObjectId, ref: 'User', require: true },
  date: { type: String, required: true },
  //creatorProfilePhotoUrl: { type: String},
  params: {}
});

export default model('Comment', commentSchema);
