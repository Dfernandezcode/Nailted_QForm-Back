/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { IFormCreate } from "../entities/form-entity";
import { formOdm } from "../odm/form.odm";

const getLastVersionForm = async () => {
  const ultimateForm = await formOdm.getLastVersionForm()
  return ultimateForm;
};

const createForm = async (formData: IFormCreate) => {
  const newFormCreated = await formOdm.createForm(formData)
  return newFormCreated;
};

const deleteAllForm = async () => {
  const isDeletedFormsInCollection = await formOdm.deleteAllForm()
  return isDeletedFormsInCollection
};

export const formDto = {
  getLastVersionForm,
  createForm,
  deleteAllForm,
};
