import { Schema, model } from 'mongoose';

const subPageSchema = new Schema({
  title: { type: String },
  description: { type: String },
});

export default model('SubPage', subPageSchema);
