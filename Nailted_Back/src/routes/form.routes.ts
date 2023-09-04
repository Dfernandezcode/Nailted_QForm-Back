import express from "express";
import { formService } from "../domain/services/form.service";

export const formRouter = express.Router();

formRouter.get("/last-version", formService.getLastVersionForm)
