/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Form, IForm, IFormCreate } from "../entities/form-entity";
import { Document } from "mongoose";

const getLastVersionForm = async () => {
  const ultimateForm = await Form.findOne().sort({ version: -1 })
    .populate({
      path: "questions",
      populate: { path: "category" }
    }).exec();
  return ultimateForm;
};

const createForm = async (formData: IFormCreate) => {
  const form = new Form(formData);
  const document: Document<IForm> = await form.save() as any;

  return document;
};

const deleteAllForm = async (): Promise<boolean> => {
  return await Form.collection.drop()
};

export const formOdm = {
  getLastVersionForm,
  createForm,
  deleteAllForm,
};
