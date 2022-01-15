import { Schema, model, PopulatedDoc, Document } from 'mongoose';
import { User } from './user';

export interface MyOwnJson {
  creator: PopulatedDoc<User & Document>
  content?: any
  published?: string
}

const myOwnJsonSchema = new Schema<MyOwnJson>({
  creator: { type: Schema.Types.ObjectId, ref: 'User', require: true },
  content: {},
  published: { type: String }
}, {strict: false});

export default model<MyOwnJson>('MyOwnJson', myOwnJsonSchema);
