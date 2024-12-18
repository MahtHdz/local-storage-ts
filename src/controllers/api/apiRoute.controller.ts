import { Request, Response } from "express";

import pkg from "@root/package.json";

const apiRoute = (_req: Request, res: Response) => {
  return res.status(200).json({
    author: pkg?.author,
    description: pkg?.description,
    version: pkg?.version,
  });
};

export default apiRoute;
