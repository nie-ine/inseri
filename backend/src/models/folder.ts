import { Schema, model, PopulatedDoc, Document } from 'mongoose';
import { File } from './files';
import { Page } from './page';
import { PageSet } from './page-set';
import { User } from './user';
import { Query } from './query';

export interface Folder {
  title: string
  owner: PopulatedDoc<User & Document>
  hasParent?: PopulatedDoc<Folder & Document>
  hasQueries?: Array<{ 
    _id?: PopulatedDoc<Query & Document>
    title?: string
  }>
  hasPageSets?: Array<{
    _id?: PopulatedDoc<PageSet & Document>
    title?: string
    actionId?: string
  }>
  hasPages: Array<PopulatedDoc<Page & Document>>
  hasFiles: Array<PopulatedDoc<File & Document>>
}

const folder = new Schema<Folder>({
  title: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User', require: true },
  hasParent: { type: Schema.Types.ObjectId, ref: 'Folder' },
  hasQueries: [{_id: { type: Schema.Types.ObjectId, ref: 'Query' },title: {type: String}}],
  hasPageSets: [{_id: { type: Schema.Types.ObjectId, ref: 'PageSet' },title: {type: String}, actionId: {type: String}}],
  hasPages: [{ type: Schema.Types.ObjectId, ref: 'Page' }],
  hasFiles: [{ type: Schema.Types.ObjectId, ref: 'File' }],
});

export default model<Folder>('Folder', folder);
