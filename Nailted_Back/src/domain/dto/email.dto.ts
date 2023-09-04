/* eslint-disable @typescript-eslint/explicit-function-return-type */
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const sendPdfByEmailToUserMail = async (userMail: string, pdfPaths: string[], submissionId: string) => {
  const emailSender = process.env.EMAIL_SENDER as string;
  const emailSenderPassword = process.env.EMAIL_SENDER_PASSWORD as string;

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: emailSender,
      pass: emailSenderPassword,
    },
  });

  const mailOptions = {
    from: emailSender,
    to: userMail,
    subject: "Informe generado y certificado adjunto",
    text: `Adjunto encontrarás los PDFs con el informe generado y el certificado. Además puedes acceder a tu página de resultados mediante el siguiente enlace: https://nailted-form-front.onrender.com/#/results-by-mail/${submissionId}. Muchas gracias por tu participación.`,
    attachments: pdfPaths.map((path, index) => ({
      filename: index === 0 ? "Nailted-Results.pdf" : "Certificate.pdf",
      path,
    })),
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error al enviar el correo electrónico:", error);
      throw new Error("Error al enviar el correo electrónico");
    }
  });
};

export const emailDto = {
  sendPdfByEmailToUserMail,
};
