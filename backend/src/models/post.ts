import { Schema, model } from 'mongoose';

const postSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true }
});

export default model('Post', postSchema);
