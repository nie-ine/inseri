import { Schema, model, PopulatedDoc, Document } from 'mongoose';
import { PageSet } from './page-set'
import { Page } from './page'
import { User } from './user';
export interface Action {
    title: string,
    description: string,
    isFinished?: boolean
    deleted?: boolean,
    type?: string,
    hasPage?: PopulatedDoc<Page & Document>,
    hasPageSet?: PopulatedDoc<PageSet & Document>,
    creator: PopulatedDoc<User>,
    published?: boolean,
    shortName?: string
}

const actionSchema = new Schema<Action>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    isFinished: { type: Boolean }, // isInProgress, isFinished
    deleted: { type: Boolean },
    type: { type: String },
    hasPage: { type: Schema.Types.ObjectId, ref: 'Page' },
    hasPageSet: { type: Schema.Types.ObjectId, ref: 'PageSet' },
    creator: { type: Schema.Types.ObjectId, ref: 'User', require: true },
    published: { type: Boolean },
    shortName: { type: String }
});

export default model<Action>('Action', actionSchema);
