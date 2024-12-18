import * as express from "express";
import models from "@storage-api/config/models/modelsArr";

declare global {
  namespace Express {
    interface Request {
      selectedModel: (typeof models)[keyof typeof models];
    }
  }
}