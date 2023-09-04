import { mongoConnect } from "../src/domain/repositories/mongo-repository";
import { appInstance } from "../src/index";
import request from "supertest";
import { app } from "../src/server";
import { ISubmissionCreate } from "../src/domain/entities/submission-entity";
import mongoose from "mongoose";
import { IForm } from "../src/domain/entities/form-entity";

describe("Natilted controller", () => {
  let formID: string;

  const submissionMock: ISubmissionCreate = {
    form: " " as unknown as IForm,
    answers: [
      {
        answer: ["En Madrid"],
        question_text: "¿Dónde se ubica la sede de tu empresa?",
      },
      {
        answer: ["11"],
        question_text: "¿Cuántos millones de euros facturo tu empresa el año pasado?",
      },
      {
        answer: ["Comercio electrónico", "Servicios"],
        question_text: "¿En que sectores trabaja tu empresa?",
      },
      {
        answer: ["de 0 a 2"],
        question_text: "¿Cúantos líneas de crédito tiene tu empresa?",
      },
      {
        answer: ["BBVA"],
        question_text: "Escribe el nombre del banco con el que trabajas",
      },
      {
        answer: ["22"],
        question_text: "¿Cuántas operaciones realizas al año?",
      },
      {
        answer: ["BBVA", "ING"],
        question_text: "¿Con qué bancos trabajas?",
      },
      {
        answer: ["de 21 a 50"],
        question_text: "¿Cúantas operaciones de inversión realizaste con estos bancos en el último año?",
      },
      {
        answer: ["Antoni Rosi"],
        question_text: "¿Nombre del jefe de RRHH?",
      },
      {
        answer: ["12"],
        question_text: "¿Cuántos empleados tiene tu empresa?",
      },
      {
        answer: ["COMPRAS", "VENTAS"],
        question_text: "¿En que departamentos hay más personal?",
      },
      {
        answer: ["de 3 a 5"],
        question_text: "¿Cúantos departamentos tiene tu empresa?",
      },
      {
        answer: ["SistemaERP123"],
        question_text: "¿Cuál es el nombre del software de gestión que utiliza tu empresa?",
      },
      {
        answer: ["85"],
        question_text: "¿Cuántos empleados de tu empresa tienen acceso a la red de la compañía?",
      },
      {
        answer: ["Encriptación de datos", "Protocolos de seguridad"],
        question_text: "¿Qué medidas de seguridad implementa tu empresa para proteger los datos de clientes y empleados?",
      },
      {
        answer: ["Ha sido útil pero no determinante"],
        question_text: "¿En qué medida la tecnología ha ayudado a tu empresa a mantenerse competitiva en el mercado?",
      },
    ],
    date: new Date(),
  };

  let submissionId: string;

  beforeAll(async () => {
    await mongoConnect();
    const formLastVersionResponse = await request(app).get("/form/last-version").expect(200);
    expect(formLastVersionResponse.body).toHaveProperty("_id");
    formID = formLastVersionResponse.body._id;

    submissionMock.form = formID as unknown as IForm;
  });

  afterAll(async () => {
    await mongoose.connection.close();
    appInstance.close();
  });

  it("GET /form/last-version", async () => {
    const formLastVersionResponse = await (await request(app).get("/form/last-version")).body;
    if (!formLastVersionResponse) {
      expect(404).toBeDefined();
    }
    expect(formLastVersionResponse).toBeDefined();
  });

  it("POST /submission", async () => {
    const response = await request(app).post("/submission/create-submission").send(submissionMock).expect(201);
    expect(response.body).toHaveProperty("_id");
    submissionId = response.body._id;
  });

  it("GET /submission/get-feedbac/:id exists ID", async () => {
    const submissionIdResponse = await request(app).get(`/submission/get-feedback/${submissionId}`).expect(200);
    expect(submissionIdResponse).toBeDefined();
  });

  it("PATCH /submission/add-email-to-submission-and-send-pdf", async () => {
    const updatedData = {
      submissionId,
      userMail: "diego.mompo.redoli@gmail.com",
    };
    const message = "Correo electrónico enviado: 250 2.0.0 OK  1689939635 h10-20020a5d6e0a000000b003141e9e2f81sm4032834wrz.4 - gsmtp"
    await request(app).patch("/submission/add-email-to-submission-and-send-pdf").send(updatedData).expect(200);
    expect(message)
  });

  it("GET /submission/get-feedbac/:id not exists ID", async () => {
    submissionId = "64b7b51e7ec4661af1b2834e";
    const submissionIdResponse = await request(app).get(`/submission/get-feedback/${submissionId}`).expect(500);
    expect(submissionIdResponse).toBeDefined();
  });
});
