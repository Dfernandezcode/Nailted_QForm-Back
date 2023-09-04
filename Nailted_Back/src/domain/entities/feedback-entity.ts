import { CategoryEnum } from "./category-entity";

export interface QuestionPoints {
  answer: string[] | undefined;
  question_text: string;
  categoryName: CategoryEnum;
  points: number;
  maxPoints: number;
}

export interface GlobalFeedbackSended {
  points: number;
  globalFeedback: string[];
  maxPoints: number;
}
export interface CategoryFeedbackSended {
  name: CategoryEnum;
  points: number;
  feedback: {
    shortText: string[];
    longText: string [];
  };
  maxPoints: number;
}

export interface FeedbackSended {
  submissionId: string;
  global: GlobalFeedbackSended;
  categories: CategoryFeedbackSended[];
}
