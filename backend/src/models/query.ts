import { Schema, model } from 'mongoose';

const querySchema = new Schema({
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

export default model('Query', querySchema);
