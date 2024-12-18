import { Router } from "express";

import getControllers from "@storage-api/controllers/get";

const getRouter = Router();

getRouter.get("/document/:id", getControllers.getOne);
getRouter.get("/documents/all", getControllers.getAll);

export default getRouter;
