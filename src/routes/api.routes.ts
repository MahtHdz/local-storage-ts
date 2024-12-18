import { Router } from "express";

import apiControllers from "@storage-api/controllers/api";

const apiRouter = Router();

apiRouter.get("/", apiControllers.rootRoute);
apiRouter.get("/api", apiControllers.apiRoute);

export default apiRouter;