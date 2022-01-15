import { Schema, model, PopulatedDoc, Document } from 'mongoose';
import { Action } from './action';
import { Page } from './page';
import { User } from './user';

export interface Comment {
  commentText: string
  page?: PopulatedDoc<Page & Document>
  action?: PopulatedDoc<Action & Document>
  creator: PopulatedDoc<User & Document>
  date: string
  params: any
}

const commentSchema = new Schema<Comment>({
  commentText: { type: String, required: true },
  page: { type: Schema.Types.ObjectId, ref: 'Page' },
  action: { type: Schema.Types.ObjectId, ref: 'Action' },
  creator: { type: Schema.Types.ObjectId, ref: 'User', require: true },
  date: { type: String, required: true },
  //creatorProfilePhotoUrl: { type: String},
  params: {}
});

export default model<Comment>('Comment', commentSchema);
