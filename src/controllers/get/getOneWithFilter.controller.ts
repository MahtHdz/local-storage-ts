import { Request, Response } from 'express';

import File from '@storage-api/models/file.model';

interface CustomRequest extends Request {
  body: {
    key: string;
    value: string | number;
  };
}

const getOneWithFilter = async (req: CustomRequest, res: Response) => {
  const { key, value } = req.body;
  try {
    const response = await File.findOne({
      [key]: value,
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json(error);
  }
};

export default getOneWithFilter