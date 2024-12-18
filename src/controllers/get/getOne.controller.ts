import { Request, Response } from 'express';

import File from '@storage-api/models/file.model';

const getOne = async (req: Request, res: Response) => {
  const fileId = req.params.id;
  try {
    const response = await File.findById({ _id: fileId });
    if(!response) {
      throw new Error('File not found');
    }
    res.status(200).json(response);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export default getOne