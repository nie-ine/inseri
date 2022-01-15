import { Schema, model } from 'mongoose';

const userGroup = new Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  users: [{type: Schema.Types.ObjectId, ref: 'User'}],
  adminsUsers: [{type: Schema.Types.ObjectId, ref: 'User'}],
  //owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true },
  hasPages: [{type: Schema.Types.ObjectId, ref: 'Page'}],
  //hasPageSets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PageSet' }],
  //hasActions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Action'}],
  hasActions: [{
    actionId: {type: Schema.Types.ObjectId, ref: 'Action'},
    //pageSetId: {type: mongoose.Schema.Types.ObjectId, ref: 'PageSet'},
    hasPages: [{type: Schema.Types.ObjectId, ref: 'Page'}]
  }]

});

export default model('userGroup', userGroup);
