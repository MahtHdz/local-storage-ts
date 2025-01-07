import { Request, Response } from "express";

import File from "@storage-api/models/file.model";

interface CustomRequest extends Request {
  body: {
    ids: string[];
  };
}

const getMany = async (req: CustomRequest, res: Response) => {
  const filesIds = req.body.ids;
  try {
    const response = await File.find({ _id: { $in: filesIds } });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json(error);
  }
};

export default getMany;
