/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { ICategory, ICategoryCreate } from "../entities/category-entity";
import { categoryOdm } from "../odm/category.odm";

const createCategorysFromArray = async (categoryList: ICategoryCreate[]) => {
  const newCategoryCreatedList = []
  for (const category of categoryList) {
    const newCategoryCreated = await categoryOdm.createCategory(category);
    newCategoryCreatedList.push(newCategoryCreated)
  }
  return newCategoryCreatedList as ICategory[]
};

const deleteAllCategory = async () => {
  const isDeletedCategorysInCollection = await categoryOdm.deleteAllCategory()
  return isDeletedCategorysInCollection
};

export const categoryDto = {
  createCategorysFromArray,
  deleteAllCategory,
};
