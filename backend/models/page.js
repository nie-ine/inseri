const mongoose = require('mongoose');

const pageSchema = mongoose.Schema({
    title: { type: String },
    description: { type: String },
    openApps: { type: [String] },
    appInputQueryMapping: { type: [String] },
    queries: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Query' }],
    published: { type: Boolean },
    showAppTitlesOnPublish: { type: Boolean },
    showAppSettingsOnPublish: { type: Boolean },
    showInseriLogoOnPublish: { type: Boolean },
    showDataBrowserOnPublish: { type: Boolean },
    tiles: { type: Boolean },
    chosenWidth: { type: Number },
    hasSubPages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SubPage'  }],
    jsonId: { type: String },
    ownQuery: { type: String }
});

module.exports = mongoose.model('Page', pageSchema);
