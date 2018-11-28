const mongoose = require('mongoose');

const querySchema = mongoose.Schema({
    title: { type: String, required: true },
    serverUrl: { type: String },
    urlExtension: { type: String },
    body: { type: String},
    abstractResponse: { type: String },
    isBoundToPage: { type: String },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true }
});

module.exports = mongoose.model('Query', querySchema);