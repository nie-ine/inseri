import { Schema, model, PopulatedDoc, Document } from 'mongoose';
import { Query } from './query';

export interface Page {
    title?: string
    description?: string
    openApps?: string[]
    appInputQueryMapping?: string[]
    queries?: Array<PopulatedDoc<Query & Document>>,
    published?: boolean,
    showAppTitlesOnPublish?: boolean,
    showAppSettingsOnPublish?: boolean,
    showInseriLogoOnPublish?: boolean,
    showDataBrowserOnPublish?: boolean,
    tiles?: boolean,
    chosenWidth?: number,
    jsonId?: string,
    ownQuery?: string,
    publishedAsTemplate?: boolean,
    templatePhotoURL?: string,
    hasSubPages?: Array<PopulatedDoc<Page & Document>>,
    featured?: boolean,
    featuredDescription?: string
}

const pageSchema = new Schema<Page>({
    title: { type: String },
    description: { type: String },
    openApps: { type: [String] },
    appInputQueryMapping: { type: [String] },
    queries: [{ type: Schema.Types.ObjectId, ref: 'Query' }],
    published: { type: Boolean },
    showAppTitlesOnPublish: { type: Boolean },
    showAppSettingsOnPublish: { type: Boolean },
    showInseriLogoOnPublish: { type: Boolean },
    showDataBrowserOnPublish: { type: Boolean },
    tiles: { type: Boolean },
    chosenWidth: { type: Number },
    jsonId: { type: String },
    ownQuery: { type: String },
    publishedAsTemplate: { type: Boolean },
    templatePhotoURL: {type: String},
    hasSubPages: [{ type: Schema.Types.ObjectId, ref: 'Page'  }],
    featured: { type: Boolean },
    featuredDescription: { type: String }
    //hasParent:{ type: mongoose.Schema.Types.ObjectId, ref: 'Page'  }
});

export default model<Page>('Page', pageSchema);
