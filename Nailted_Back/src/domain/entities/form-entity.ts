import mongoose, { Document, Schema } from "mongoose";
import { Category, ICategory } from "./category-entity";

export enum TypeInput {
  Text = "text",
  Number = "number",
  Radio = "radio",
  Checkbox = "checkbox",
}

export interface IOption {
  name: string;
  points: number;
}

export interface OptionNumber {
  min: number;
  max: number;
  points: number;
}

export interface IQuestion {
  category: ICategory;
  type: TypeInput;
  question_text: string;
  placeholder?: string;
  options?: IOption[];
  optionsNumber?: OptionNumber[];
}

export interface GlobalFeedback {
  min: number;
  max: number;
  text: string[];
}

export interface IFormCreate {
  version: number;
  globalFeedback: GlobalFeedback[];
  questions: IQuestion[];
}
const formSchema = new Schema<IFormCreate>({
  version: { type: Number, required: true },
  globalFeedback: [{
    min: { type: Number, required: true },
    max: { type: Number, required: true },
    text: [{ type: String, required: true }]
  }],
  questions: [{
    category: { type: Schema.Types.ObjectId, ref: Category, required: true },
    type: { type: String, enum: Object.values(TypeInput), required: true },
    question_text: { type: String, required: true },
    placeholder: { type: String },
    options: [{
      name: { type: String, required: true },
      points: { type: Number, required: true }
    }],
    optionsNumber: [{
      min: { type: Number, required: true },
      max: { type: Number, required: true },
      points: { type: Number, required: true }
    }]
  }]
});

export type IForm = IFormCreate & Document;
export const Form = mongoose.model<IForm>("Form", formSchema);
