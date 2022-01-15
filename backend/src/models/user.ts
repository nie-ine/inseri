import { Schema, model } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    newsletter: { type: Boolean },
    delete: { type: Date },
    usrProfileFilePath: { type: String}
});

userSchema.plugin(uniqueValidator);

export default model('User', userSchema);
