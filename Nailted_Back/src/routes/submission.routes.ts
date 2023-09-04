import express from "express";
import { submissionService } from "../domain/services/submission.service";

export const submissionRouter = express.Router();

submissionRouter.post("/create-submission", submissionService.createSubmission)
submissionRouter.patch("/add-email-to-submission-and-send-pdf", submissionService.addUserMailToSubmissionAndSendPdfByMail)
submissionRouter.get("/get-feedback/:submissionId", submissionService.getFeedback)
