/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { FeedbackSended, QuestionPoints } from "../entities/feedback-entity";
import { ISubmission, ISubmissionCreate } from "../entities/submission-entity";
import { submissionOdm } from "../odm/submission.odm";

const getFeedbackBySubmissionId = async (submissionId: string): Promise<FeedbackSended> => {
  const submission = await submissionOdm.getSubmissionById(submissionId);
  if (!submission) {
    throw new Error("No existe el submission");
  }
  const submissionData = submission.toObject();

  const questionPoints = await submissionOdm.getPointsByQuestion(submissionData);
  const userGlobalFeedback = await submissionOdm.getUserGlobalPointsAndFeedback(submissionData, questionPoints);
  const userCategoriesFeedback = await submissionOdm.getCategoryPointsAndFeedback(submissionData, questionPoints);

  const feedback: FeedbackSended = {
    submissionId,
    global: userGlobalFeedback,
    categories: userCategoriesFeedback,
  };

  return feedback;
};

const createSubmission = async (submissionData: ISubmissionCreate) => {
  const createdSubmission = await submissionOdm.createSubmission(submissionData);
  return createdSubmission;
};

const getPointsByQuestion = async (submissionData: ISubmission) => {
  const questionPoints: QuestionPoints[] = await submissionOdm.getPointsByQuestion(submissionData);
  return questionPoints;
};

const getUserGlobalPointsAndFeedback = async (submissionData: ISubmission, questionPoints: QuestionPoints[]) => {
  const globalPointsAndFeedback = await submissionOdm.getUserGlobalPointsAndFeedback(submissionData, questionPoints);
  return globalPointsAndFeedback;
};

const getCategoryPointsAndFeedback = async (submissionData: ISubmission, questionPoints: QuestionPoints[]) => {
  const categoryPointsAndFeedback = await submissionOdm.getCategoryPointsAndFeedback(submissionData, questionPoints);
  return categoryPointsAndFeedback;
};

const createSubmissionsFromArray = async (submissionList: ISubmissionCreate[]) => {
  const submissionsCreated = [];
  for (const submission of submissionList) {
    const submissionCreated = await submissionOdm.createSubmission(submission);
    submissionsCreated.push(submissionCreated);
  }
  return submissionsCreated;
};

const deleteAllSubmissions = async () => {
  const isDeletedSubmissionsInCollection = await submissionOdm.deleteAllSubmissions();
  return isDeletedSubmissionsInCollection;
};

const addUserMailToSubmission = async (submissionId: string, userMail: string) => {
  const submissionToUpdate = await submissionOdm.getSubmissionById(submissionId);
  if (!submissionToUpdate) {
    throw new Error("No existe el submission");
  }
  const submissionUpdated = await submissionOdm.addUserMailToSubmission(submissionToUpdate as unknown as ISubmission, userMail);
  return submissionUpdated;
};

export const submissionDto = {
  getFeedbackBySubmissionId,
  createSubmission,
  getPointsByQuestion,
  getUserGlobalPointsAndFeedback,
  getCategoryPointsAndFeedback,
  createSubmissionsFromArray,
  deleteAllSubmissions,
  addUserMailToSubmission,
};
