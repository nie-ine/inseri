import { Schema, model } from 'mongoose';

export interface SubPage {
  title?: string
  description?: string
}

const subPageSchema = new Schema<SubPage>({
  title: { type: String },
  description: { type: String },
});

export default model<SubPage>('SubPage', subPageSchema);
