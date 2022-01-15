import { Schema, model } from 'mongoose';

export interface Post {
    title: string
    content: string
}

const postSchema = new Schema<Post>({
    title: { type: String, required: true },
    content: { type: String, required: true }
});

export default model<Post>('Post', postSchema);
