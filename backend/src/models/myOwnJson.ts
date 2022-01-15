import { Schema, model } from 'mongoose';

const myOwnJsonSchema = new Schema({
  creator: { type: Schema.Types.ObjectId, ref: 'User', require: true },
  content: {},
  published: { type: String }
}, {strict: false});

export default model('MyOwnJson', myOwnJsonSchema);
