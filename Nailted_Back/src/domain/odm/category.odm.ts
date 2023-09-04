/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Category, ICategory, ICategoryCreate } from "../entities/category-entity";
import { Document } from "mongoose";

const createCategory = async (categoryData: ICategoryCreate) => {
  const category = new Category(categoryData);
  const newCategory: Document<ICategory> = await category.save();

  return newCategory;
};

const deleteAllCategory = async (): Promise<boolean> => {
  return await Category.collection.drop()
};

export const categoryOdm = {
  createCategory,
  deleteAllCategory,
};
