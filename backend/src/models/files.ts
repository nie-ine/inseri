import { Schema, model } from 'mongoose';

const file = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  urlPath: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User', require: true },
  //normalizedFileName: {type: String, required: true},
  uploadedOn: {type: Date, default: Date.now},
});

export default model('File', file);
