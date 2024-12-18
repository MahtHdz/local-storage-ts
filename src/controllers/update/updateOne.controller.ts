import { Request, Response } from 'express';

import File from '@storage-api/models/file.model';
import IFile from '@storage-api/interfaces/models/IFile';

interface CustomRequest extends Request {
  body: Partial<IFile>;
}

const updateOne = async (req: CustomRequest, res: Response) => {
  const newData = req.body;

  let updatedDBDocument = null;
  try {
    updatedDBDocument = await File.findByIdAndUpdate(
      { _id: req.params.id },
      newData,
      { new: true }
    );
  } catch (error: any) {
    return res.status(404).json(error.message);
  }
  return res.status(204).send();
};

export default updateOne