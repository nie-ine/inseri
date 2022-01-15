import { Schema, model } from 'mongoose';

const actionSchema = new Schema({
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

export default model('Action', actionSchema);
