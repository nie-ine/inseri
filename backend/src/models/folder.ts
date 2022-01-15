import { Schema, model } from 'mongoose';

const folder = new Schema({
  title: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User', require: true },
  hasParent: { type: Schema.Types.ObjectId, ref: 'Folder' },
  hasQueries: [{_id: { type: Schema.Types.ObjectId, ref: 'Query' },title: {type: String}}],
  hasPageSets: [{_id: { type: Schema.Types.ObjectId, ref: 'PageSet' },title: {type: String}, actionId: {type: String}}],
  hasPages: [{ type: Schema.Types.ObjectId, ref: 'Page' }],
  hasFiles: [{ type: Schema.Types.ObjectId, ref: 'File' }],
});

export default model('Folder', folder);
