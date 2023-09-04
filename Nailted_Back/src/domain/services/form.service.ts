import { Request, Response, NextFunction } from "express";
import { formDto } from "../dto/form.dto";

export const getLastVersionForm = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const lastVersionForm = await formDto.getLastVersionForm()
    if (!lastVersionForm) {
      res.status(404).json({ error: "No existe el form" });
      return;
    }
    res.status(200).json(lastVersionForm)
  } catch (error) {
    next(error);
  }
}

export const formService = {
  getLastVersionForm,
};
