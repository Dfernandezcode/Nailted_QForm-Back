/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { formDto } from "../dto/form.dto";
import { submissionDto } from "../dto/submission.dto";
import { IFormCreate, TypeInput } from "../entities/form-entity"
import { answerList, categoriesList, questionsList } from "../../data";
import { mongoConnect, mongoDisconnect } from "../repositories/mongo-repository";
import { categoryDto } from "../dto/category.dto";
import { CategoryEnum, } from "../entities/category-entity";

export const seed = async () => {
  try {
    await mongoConnect();
    await submissionDto.deleteAllSubmissions();
    console.log("Submission borrados");
    await formDto.deleteAllForm();
    console.log("Form borrados");
    await categoryDto.deleteAllCategory();
    console.log("Categories borrados");

    const categoriesSaved = await categoryDto.createCategorysFromArray(categoriesList)
    console.log("Categories creadas");

    const financeCategory = categoriesSaved.find((category) => category?.name === CategoryEnum.Finance);
    const operationsCategory = categoriesSaved.find((category) => category?.name === CategoryEnum.Operations);
    const rrhhCategory = categoriesSaved.find((category) => category?.name === CategoryEnum.RRHH);
    const tecnologyCategory = categoriesSaved.find((category) => category?.name === CategoryEnum.Tecnology);

    const questionCompletedList: ({ category: any; type: TypeInput; question_text: string; placeholder: string; optionsNumber: undefined; options: undefined; } | { category: any; type: TypeInput; question_text: string; optionsNumber: { min: number; max: number; points: number; }[]; placeholder: string; options: undefined; } | { category: any; type: TypeInput; question_text: string; options: { name: string; points: number; }[]; placeholder: undefined; optionsNumber: undefined; })[] = []
    questionsList.financial.forEach(question => {
      const questionCompleted = {
        ...question,
        category: financeCategory?.id,
      };
      questionCompletedList.push(questionCompleted);
    });

    questionsList.operations.forEach(question => {
      const questionCompleted = {
        ...question,
        category: operationsCategory?.id,
      };
      questionCompletedList.push(questionCompleted);
    });

    questionsList.rrhh.forEach(question => {
      const questionCompleted = {
        ...question,
        category: rrhhCategory?.id,
      };
      questionCompletedList.push(questionCompleted);
    });

    questionsList.tecnology.forEach(question => {
      const questionCompleted = {
        ...question,
        category: tecnologyCategory?.id,
      };
      questionCompletedList.push(questionCompleted);
    });

    const lastVersionForm: IFormCreate = {
      version: 2.0,
      globalFeedback: [
        {
          min: 0,
          max: 10,
          text: ["Podéis hacerlo mejor", "Reflexiona sobre las políticas de tu empresa"],
        },
        {
          min: 11,
          max: 20,
          text: ["Implementa nuevas medidas", "Hay mucho margen de mejora"],
        },
        {
          min: 21,
          max: 30,
          text: ["Tu empresa tiene buenas políticas", "¡Enhorabuena, gran trabajo!"],
        },
      ],
      questions: questionCompletedList,
    };

    const lastVersionFormCreated = await formDto.createForm(lastVersionForm);
    console.log("Form last version creado");

    const newForm: IFormCreate = {
      version: 1.0,
      globalFeedback: [
        {
          min: 0,
          max: 10,
          text: ["Podéis hacerlo mejor", "Reflexiona sobre las políticas de tu empresa"],
        },
        {
          min: 11,
          max: 20,
          text: ["Implementa nuevas medidas", "Hay mucho margen de mejora"],
        },
        {
          min: 21,
          max: 30,
          text: ["Tu empresa tiene buenas políticas", "¡Enhorabuena, gran trabajo!"],
        },
      ],
      questions: questionCompletedList,
    };

    const formCreated = await formDto.createForm(newForm);
    console.log("Form creado");

    const newSubmissions = [
      {
        date: new Date(),
        userMail: "ejemplo@gmail.com",
        form: lastVersionFormCreated.id,
        answers: answerList,
      },
      {
        date: new Date(),
        form: formCreated.id,
        answers: answerList,
      },
    ];

    await submissionDto.createSubmissionsFromArray(newSubmissions);
    console.log("Submission creado");
  } catch (error) {
    console.error(error);
  } finally {
    await mongoDisconnect();
    console.log("Proceso terminado");
  }
};

void seed();
