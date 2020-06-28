import { Model, model, Types } from 'mongoose';
import { FeedbackSchema, feedbackSchema } from './feedback.schema';

export default model<FeedbackSchema, Model<FeedbackSchema>>('Feedback', feedbackSchema);

