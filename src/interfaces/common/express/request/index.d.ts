import { Request } from "express";

import models from "@storage-api/config/models/modelsArr";

export interface ModelRequest extends Request {
  selectedModel: (typeof models)[keyof typeof models];
}
