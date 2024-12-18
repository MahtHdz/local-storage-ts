import { Request, Response } from 'express';
import File from '@storage-api/models/file.model';

interface CustomRequest extends Request {
  body: {
    key: string;
    value: string | number;
  }
};

const downloadOne = async (req: CustomRequest, res: Response) => {
  const { key, value } = req.body;
  try {
    const response = await File.findOne({
      [String(key)]: value,
    });
    return res.status(200).download(response?.filepath);
  } catch (error: any) {
    return res.status(404).json(error.message);
  }
};

export default downloadOne