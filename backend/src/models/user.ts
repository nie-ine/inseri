import { Schema, model } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

export interface User {
    email: string
    password: string
    firstName?: string
    lastName?: string
    newsletter?: boolean
    delete?: Date
    usrProfileFilePath?: string
}

const userSchema = new Schema<User>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    newsletter: { type: Boolean },
    delete: { type: Date },
    usrProfileFilePath: { type: String}
});

userSchema.plugin(uniqueValidator);

export default model<User>('User', userSchema);
