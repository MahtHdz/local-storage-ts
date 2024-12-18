import { Request, Response } from 'express'

import File from '@storage-api/models/file.model';

const getAll = async (_req: Request, res: Response) => {
  let response = null;
  try {
    response = await File.find();
  } catch (error) {
    return res.status(404).json(error);
  }
  return res.status(200).json(response);
};

export default getAll