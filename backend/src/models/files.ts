import { Schema, model, PopulatedDoc, Document } from 'mongoose';
import { User } from './user';

export interface File {
  title: string
  description?: string
  urlPath: string
  owner: PopulatedDoc<User & Document>
  uploadedOn?: Date
}

const file = new Schema<File>({
  title: { type: String, required: true },
  description: { type: String, required: false },
  urlPath: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User', require: true },
  //normalizedFileName: {type: String, required: true},
  uploadedOn: {type: Date, default: Date.now},
});

export default model<File>('File', file);
