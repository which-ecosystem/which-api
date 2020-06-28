import { Model, model } from 'mongoose';
import { FeedbackSchema, feedbackSchema } from './feedback.schema';

feedbackSchema.index({ version: 1, authorId: 1 }, { unique: true }); // Unique together

export default model<FeedbackSchema, Model<FeedbackSchema>>('Feedback', feedbackSchema);

