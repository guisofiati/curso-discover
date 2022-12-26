import { Router } from "express";

import { CreateCarController } from "@modules/car/useCases/createCar/CreateCarController";
import { ListAvailableCarsController } from "@modules/car/useCases/listAvailableCars/ListAvailableCarsController";
import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

const carRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();

carRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle,
);

carRoutes.get("/available", listAvailableCarsController.handle);

export { carRoutes };
// eslint-disable-next-line prettier/prettier
