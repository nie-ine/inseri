const mongoose = require('mongoose');

const pageSetSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    linkToImage: { type: String },
    hasPages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Page' }],
    hash: { type: String },
    //hasPages: [{_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Page' }, subPages:[{_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Page' }}]}],
});

module.exports = mongoose.model('PageSet', pageSetSchema);
