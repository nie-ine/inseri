const mongoose = require('mongoose');

const userGroup = mongoose.Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  users: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  adminsUsers: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  //owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true },
  hasPages: [{type: mongoose.Schema.Types.ObjectId, ref: 'Page'}],
  //hasPageSets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PageSet' }],
  //hasActions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Action'}],
  hasActions: [{
    actionId: {type: mongoose.Schema.Types.ObjectId, ref: 'Action'},
    //pageSetId: {type: mongoose.Schema.Types.ObjectId, ref: 'PageSet'},
    hasPages: [{type: mongoose.Schema.Types.ObjectId, ref: 'Page'}]
  }]

});

module.exports = mongoose.model('userGroup', userGroup);
