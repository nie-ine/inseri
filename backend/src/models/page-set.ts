import { Schema, model, PopulatedDoc, Document } from 'mongoose';
import {Page} from './page'

export interface PageSet {
    title: string
    description: string
    linkToImage?: string
    hasPages?: Array<PopulatedDoc<Page & Document>>
    hash?: string
}

const pageSetSchema = new Schema<PageSet>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    linkToImage: { type: String },
    hasPages: [{ type: Schema.Types.ObjectId, ref: 'Page' }],
    hash: { type: String },
    //hasPages: [{_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Page' }, subPages:[{_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Page' }}]}],
});

export default model<PageSet>('PageSet', pageSetSchema);
