import { Request, Response } from "express";

const rootRoute = (_req: Request, res: Response) => {
  return res.status(200).json({
    message: "Welcome to the local storage API!",
  });
};

export default rootRoute;
