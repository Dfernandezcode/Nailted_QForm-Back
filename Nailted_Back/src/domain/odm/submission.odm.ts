/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { CategoryEnum } from "../entities/category-entity";
import { IQuestion, TypeInput } from "../entities/form-entity";
import { Submission, ISubmission, ISubmissionCreate, IAnswer } from "../entities/submission-entity";
import { Document } from "mongoose";

interface QuestionPoints {
  answer: string[] | undefined;
  question_text: string;
  categoryName: CategoryEnum;
  points: number;
  maxPoints: number;
}

const createSubmission = async (submissionData: ISubmissionCreate) => {
  const submission = new Submission(submissionData);
  const document = await submission.save() as Document<ISubmission>;

  return document;
};

const getSubmissionById = async (id: string) => {
  const submission = await Submission.findById(id).populate({
    path: "form",
    populate: {
      path: "questions.category"
    }
  }).exec();

  if (!submission) {
    throw new Error("No existe el submission");
  }
  return submission;
};

const getPointsByQuestion = async (submissionData: ISubmission) => {
  const questions = submissionData.form.questions;
  const result: QuestionPoints[] = [];

  for (const question of questions) {
    const answer = submissionData.answers.find(answer => answer.question_text === question.question_text);

    let points = 0;
    let maxPoints = 0;

    if (question.type === TypeInput.Number) {
      points = calculatePointsForNumberQuestion(answer as IAnswer, question);
      maxPoints = calculateMaxPointsForNumberQuestion(question);
    } else if (question.type === TypeInput.Checkbox) {
      points = calculatePointsForCheckboxQuestion(answer as IAnswer, question);
      maxPoints = calculateMaxPointsForCheckboxQuestion(question);
    } else if (question.type === TypeInput.Radio) {
      points = calculatePointsForRadioQuestion(answer as IAnswer, question);
      maxPoints = calculateMaxPointsForRadioQuestion(question);
    }

    result.push({
      answer: answer?.answer,
      question_text: question.question_text,
      categoryName: question.category.name as CategoryEnum,
      points,
      maxPoints,
    });
  }

  return result;
};

const calculatePointsForNumberQuestion = (answer: IAnswer, question: IQuestion) => {
  const { optionsNumber } = question;
  if (answer && answer.answer.length > 0 && optionsNumber) {
    const numberAnswer = parseInt(answer.answer[0]);
    const matchedOption = optionsNumber.find(option => numberAnswer >= option.min && numberAnswer <= option.max);
    return matchedOption?.points ?? 0;
  }

  return 0;
};

const calculateMaxPointsForNumberQuestion = (question: IQuestion) => {
  const { optionsNumber } = question;
  const pointsArray = optionsNumber?.map(option => option.points) ?? [];
  return Math.max(...pointsArray, 0);
};

const calculatePointsForCheckboxQuestion = (answer: IAnswer, question: IQuestion) => {
  const { options } = question;
  if (answer && answer.answer.length > 0 && options) {
    const selectedOptions = answer.answer;
    return options.reduce((total: number, option: { points: number; name: string; }) => {
      if (option.points > 0 && selectedOptions.includes(option.name)) {
        return total + option.points;
      }
      return total;
    }, 0);
  }

  return 0;
};

const calculateMaxPointsForCheckboxQuestion = (question: IQuestion) => {
  const { options } = question;
  return options?.reduce((total: number, option: { points: number; }) => {
    if (option.points > 0) {
      return total + option.points;
    }
    return total;
  }, 0) ?? 0;
};

const calculatePointsForRadioQuestion = (answer: IAnswer, question: IQuestion) => {
  const { options } = question;
  if (answer && answer.answer.length > 0 && options) {
    const selectedOption = answer.answer[0];
    const matchedOption = options.find(option => option.name === selectedOption);
    return matchedOption?.points ?? 0;
  }

  return 0;
};

const calculateMaxPointsForRadioQuestion = (question: IQuestion) => {
  const { options } = question;
  return Math.max(...(options?.map(option => option.points) ?? []), 0);
};

const getUserGlobalPointsAndFeedback = async (submissionData: ISubmission, questionPoints: QuestionPoints[]) => {
  let points = 0;
  let maxPoints = 0;

  for (const question of questionPoints) {
    points += question.points;
    maxPoints += question.maxPoints;
  }

  const globalFeedback = submissionData.form.globalFeedback
    .reduce<string[]>(
    (feedback, feedbackItem) => {
      if (points >= feedbackItem.min && points <= feedbackItem.max) {
        return feedback.concat(feedbackItem.text);
      }
      return feedback;
    },
    []
  );

  return { points, globalFeedback, maxPoints };
};

const getCategoryPointsAndFeedback = async (submissionData: ISubmission, questionPoints: QuestionPoints[]) => {
  const categoryPointsMap = buildCategoryPointsMap(questionPoints);

  const categoryPointsAndFeedback: { name: CategoryEnum; points: number; feedback: { shortText: string[]; longText: string[]; }; maxPoints: number; }[] = [];

  for (const [categoryName, categoryPoints] of categoryPointsMap) {
    const categoryQuestion = getCategoryQuestion(submissionData, categoryName);

    if (!categoryQuestion) {
      continue;
    }

    const categoryFeedback = getCategoryFeedback(categoryPoints, categoryQuestion);

    categoryPointsAndFeedback.push({
      name: categoryName,
      points: categoryPoints.points,
      feedback: categoryFeedback,
      maxPoints: categoryPoints.maxPoints,
    });
  }

  return categoryPointsAndFeedback;
};

const buildCategoryPointsMap = (questionPoints: QuestionPoints[]) => {
  const categoryPointsMap = new Map<CategoryEnum, {
    points: number;
    maxPoints: number;
    feedback: {
      shortText: string[];
      longText: string[];
    };
  }>();

  for (const questionPoint of questionPoints) {
    const { categoryName, points, maxPoints } = questionPoint;

    if (!categoryPointsMap.has(categoryName)) {
      categoryPointsMap.set(categoryName, { points: 0, maxPoints: 0, feedback: { shortText: [], longText: [] } });
    }

    const categoryPoints = categoryPointsMap.get(categoryName);

    if (categoryPoints) {
      categoryPoints.points += points;
      categoryPoints.maxPoints += maxPoints;
    }
  }

  return categoryPointsMap;
};

const getCategoryQuestion = (submissionData: ISubmission, categoryName: CategoryEnum) => {
  return submissionData.form.questions.find(question => question.category?.name === categoryName);
};

const getCategoryFeedback = (categoryPoints: { points: number; maxPoints: number; feedback: { shortText: string[]; longText: string[]; }; }, categoryQuestion: IQuestion): { shortText: string[]; longText: string[]; } => {
  const categoryFeedback: { shortText: string[]; longText: string[]; } = {
    shortText: [],
    longText: [],
  };

  for (const feedback of categoryQuestion.category?.feedback || []) {
    if (categoryPoints.points >= feedback.min && categoryPoints.points <= feedback.max) {
      categoryFeedback.shortText.push(...feedback.shortFeedback);
      categoryFeedback.longText.push(...feedback.longFeedback);
    }
  }

  return categoryFeedback;
};

const deleteAllSubmissions = async (): Promise<boolean> => {
  await Submission.collection.drop();
  return true;
};

const addUserMailToSubmission = async (submissionToUpdate: ISubmission, userMail: string): Promise<ISubmission> => {
  submissionToUpdate.userMail = userMail;
  const submissionUpdated = await submissionToUpdate.save();
  return submissionUpdated;
};

export const submissionOdm = {
  getUserGlobalPointsAndFeedback,
  getCategoryPointsAndFeedback,
  getSubmissionById,
  createSubmission,
  deleteAllSubmissions,
  getPointsByQuestion,
  addUserMailToSubmission,
};
