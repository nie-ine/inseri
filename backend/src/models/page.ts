import { Schema, model } from 'mongoose';

const pageSchema = new Schema({
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

export default model('Page', pageSchema);
