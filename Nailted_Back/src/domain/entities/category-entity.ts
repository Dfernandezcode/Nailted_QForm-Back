import mongoose, { Document, Schema } from "mongoose";

export enum CategoryEnum {
  Finance = "Finance",
  RRHH = "RRHH",
  Operations = "Operations",
  Tecnology = "Tecnology"
}

export interface CategoryFeedback {
  min: number;
  max: number;
  shortFeedback: string[];
  longFeedback: string[];
}

export interface ICategoryCreate {
  name: string;
  feedback: CategoryFeedback[];
}

export const categorySchema = new Schema<ICategoryCreate>({
  name: {
    type: String,
    required: true,
  },
  feedback: [
    {
      min: {
        type: Number,
        required: true,
      },
      max: {
        type: Number,
        required: true,
      },
      shortFeedback: {
        type: [String],
        required: true,
      },
      longFeedback: {
        type: [String],
        required: true,
      },
    },
  ],
});

export type ICategory = ICategoryCreate & Document;
export const Category = mongoose.model<ICategory>("Category", categorySchema);
