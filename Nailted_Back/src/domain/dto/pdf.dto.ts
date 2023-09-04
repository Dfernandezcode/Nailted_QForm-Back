/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import fs from "fs";
import path from "path";
import handlebars from "handlebars";
import htmlToPdf from "html-pdf";
import { FeedbackSended } from "../entities/feedback-entity";
import { submissionOdm } from "../odm/submission.odm";

const projectAbsolutePath: any = process.env.BASE_PATH;

const formatDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = { day: "2-digit", month: "long", year: "numeric" };
  return date.toLocaleDateString("en-US", options);
};

const createPdfAndSaveTemporarily = async (feedback: FeedbackSended) => {
  const htmlTemplatePathString = `${projectAbsolutePath}/templates/dinamic.html`;
  const htmlTemplate = fs.readFileSync(htmlTemplatePathString, "utf-8");

  const template = handlebars.compile(htmlTemplate);

  const renderedHtml = template(feedback);
  const filename: string = await new Promise((resolve, reject) => {
    const options: htmlToPdf.CreateOptions = { height: "290mm", format: "A4", orientation: "portrait" };
    htmlToPdf.create(renderedHtml, options).toBuffer((err, buffer) => {
      if (err) {
        console.error("Error al generar el PDF:", err);
        reject(new Error("Error al generar el PDF"));
      }

      const filePath = path.join(projectAbsolutePath, "templates", "Temporary-report.pdf");
      fs.writeFileSync(filePath, buffer);
      resolve(filePath);
    });
  });
  return filename;
};

const createCertificatePdfAndSaveTemporarily = async (feedback: FeedbackSended) => {
  const submission = await submissionOdm.getSubmissionById(feedback.submissionId)
  const userNameCompany = submission?.answers[0].answer;

  const htmlTemplatePathString = `${projectAbsolutePath}/templates/certificate.html`;
  const htmlTemplate = fs.readFileSync(htmlTemplatePathString, "utf-8");

  const template = handlebars.compile(htmlTemplate);

  const imageData = fs.readFileSync(`${projectAbsolutePath}/templates/img/nailted_logo.png`);
  const imageBase64 = imageData.toString("base64")

  const currentDate = new Date();
  const formattedDate = formatDate(currentDate);
  const renderedHtml = template({ imageBase64, date: formattedDate, userNameCompany });

  const options: htmlToPdf.CreateOptions = { height: "290mm", format: "A4", orientation: "landscape" };
  const pdfBuffer = await new Promise<Buffer>((resolve, reject) => {
    htmlToPdf.create(renderedHtml, options).toBuffer((err, buffer) => {
      if (err) {
        console.error("Error al generar el certificado PDF:", err);
        reject(new Error("Error al generar el certificado PDF"));
      } else {
        resolve(buffer);
      }
    });
  });

  const filePath = path.join(projectAbsolutePath, "templates", "Temporary-certificate.pdf");
  fs.writeFileSync(filePath, pdfBuffer);
  return filePath;
};

export const pdfDto = {
  createPdfAndSaveTemporarily,
  createCertificatePdfAndSaveTemporarily,
};
