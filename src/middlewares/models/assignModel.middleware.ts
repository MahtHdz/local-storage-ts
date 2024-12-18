import { Response, NextFunction } from "express";

import models from "@storage-api/config/models/modelsArr";
import { ModelRequest } from "@storage-api/interfaces/common/express/request";

export const assignModel = (
  req: unknown,
  _res: Response,
  next: NextFunction
) => {
  (req as ModelRequest).selectedModel = models["File"];
  next();
};

export default assignModel;
