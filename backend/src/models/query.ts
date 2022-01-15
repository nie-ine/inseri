import { Schema, model, PopulatedDoc, Document } from 'mongoose';
import { User } from './user';

export interface Query {
    title: string
    description?: string
    serverUrl?: string
    method?: string
    params: [{
        _id: any
        key?: string
        value?: string
    }],
    header: [{
        _id: any
        key?: string
        value?: string
    }],
    body?: string
    isBoundToPage?: string 
    path: string[],
    creator: PopulatedDoc<User & Document>,
    published?: boolean
}

const querySchema = new Schema<Query>({
    title: { type: String, required: true },
    description: { type: String },
    serverUrl: { type: String },
    method: { type: String},
    params: [
        {
            _id: false,
            key: { type: String},
            value: { type: String}
        }
    ],
    header: [
        {
            _id: false,
            key: { type: String},
            value: { type: String}
        }
    ],
    body: { type: String},
    isBoundToPage: { type: String },
    path: [ { type: String } ],
    creator: { type: Schema.Types.ObjectId, ref: 'User', require: true },
    published: { type: Boolean }
});

export default model<Query>('Query', querySchema);
