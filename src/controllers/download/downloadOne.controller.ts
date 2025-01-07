import { Request, Response } from 'express';
import File from '@storage-api/models/file.model';

const downloadOne = async (req: Request, res: Response) => {
  try {
    const response = await File.findOne({
      _id: req.params.id,
    });
    return res.status(200).download(response?.filepath);
  } catch (error: any) {
    return res.status(404).json(error.message);
  }
};

export default downloadOne