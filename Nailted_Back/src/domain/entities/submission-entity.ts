import mongoose, { Document, Schema } from "mongoose";
import { Form, IForm } from "./form-entity";

const actualDate = new Date()

export interface IAnswer {
  answer: string[];
  question_text: string;
}

export interface ISubmissionCreate {
  date: Date;
  userMail?: string;
  form: IForm;
  answers: IAnswer[];
}

const submissionSchema = new Schema<ISubmissionCreate>({
  date: { type: Date, default: actualDate },
  userMail: { type: String, lowercase: true },
  form: { type: Schema.Types.ObjectId, ref: Form, required: true },
  answers: [
    {
      answer: { type: [String], required: true },
      question_text: { type: String, required: true },
    },
  ],

});

export type ISubmission = ISubmissionCreate & Document
export const Submission = mongoose.model<ISubmission>("Submission", submissionSchema);
