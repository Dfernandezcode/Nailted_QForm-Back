/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Request, Response, NextFunction } from "express";
import { submissionDto } from "../dto/submission.dto";
import { emailDto } from "../dto/email.dto";
import { pdfDto } from "../dto/pdf.dto";

export const getFeedback = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const submissionId = req.params.submissionId;

    const feedback = await submissionDto.getFeedbackBySubmissionId(submissionId);
    if (!feedback) {
      res.status(404).json({ error: "No existe el feedback para ese submission" });
      return;
    }

    res.json(feedback);
  } catch (error) {
    next(error);
  }
};

export const createSubmission = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createdSubmission = await submissionDto.createSubmission(req.body);

    res.status(201).json(createdSubmission);
  } catch (error) {
    next(error);
  }
};

export const addUserMailToSubmissionAndSendPdfByMail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const submissionId = req.body.submissionId;
    const userMail = req.body.userMail;

    await submissionDto.addUserMailToSubmission(submissionId, userMail);

    const feedback = await submissionDto.getFeedbackBySubmissionId(submissionId);
    if (!feedback) {
      res.status(404).json({ error: "No existe el feedback para ese submission" });
      return;
    }

    const pdfPath = await pdfDto.createPdfAndSaveTemporarily(feedback);
    const certificatePdfPath = await pdfDto.createCertificatePdfAndSaveTemporarily(feedback);

    const pdfPaths: string[] = [pdfPath, certificatePdfPath];

    await emailDto.sendPdfByEmailToUserMail(userMail, pdfPaths, submissionId);

    res.json({ dynamicPdfPath: pdfPath, certificatePdfPath });
  } catch (error) {
    next(error);
  }
};

export const submissionService = {
  getFeedback,
  createSubmission,
  addUserMailToSubmissionAndSendPdfByMail,
};
