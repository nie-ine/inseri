import { Schema, model } from 'mongoose';

const pageSetSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    linkToImage: { type: String },
    hasPages: [{ type: Schema.Types.ObjectId, ref: 'Page' }],
    hash: { type: String },
    //hasPages: [{_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Page' }, subPages:[{_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Page' }}]}],
});

export default model('PageSet', pageSetSchema);
