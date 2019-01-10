const mongoose = require('mongoose');

const querySchema = mongoose.Schema({
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
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true }
});

module.exports = mongoose.model('Query', querySchema);
