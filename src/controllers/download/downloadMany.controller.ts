import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

import {
  copyFile,
  zipFolder,
  deleteFile,
  createFolder,
  pathConstructor,
  deleteDirectory,
  removeFilesInFolder,
} from '@storage-api/utils/fileUtils'

import File from '@storage-api/models/file.model';
import IFile from '@storage-api/interfaces/models/IFile';

interface CustomRequest extends Request {
  body: {
    ids: string[]
  }
}

const downloadMany = async (req: CustomRequest, res: Response) => {
  const filesIds = req.body.ids;
  let documents: IFile[] | null = null;
  const tmpFolderName = `${uuidv4()}`;
  const tmpFolderPath = pathConstructor([
    global.__storagePath,
    "tmp",
    tmpFolderName,
  ]);
  const tmpFolderContentPath = pathConstructor([tmpFolderPath, "content"]);
  try {
    await createFolder(tmpFolderContentPath, true);
    const response = await File.find({ _id: { $in: filesIds } });
    documents = response;
  } catch (error: any) {
    return res.status(404).json(error.message);
  }
  for (let i = 0; i < documents.length; i++) {
    const file = documents[i];
    const { filepath, filename } = file;
    const destination = pathConstructor([tmpFolderContentPath, filename]);
    try {
      await copyFile(filepath, destination);
    } catch (error: any) {
      return res.status(404).json(error.message);
    }
  }
  const zipName = `${uuidv4()}.zip`;
  const zipPath = pathConstructor([tmpFolderPath, zipName]);
  const source = pathConstructor([tmpFolderContentPath, "."]);
  try {
    await zipFolder(source, zipPath);
  } catch (error: any) {
    return res.status(404).json(error.message);
  }
  try {
    await removeFilesInFolder(source);
  } catch (error: any) {
    return res.status(404).json(error.message);
  }
  return res.status(200).sendFile(zipPath, async (error: any) => {
    if (error) {
      return res.status(404).json(error.message);
    }
    try {
      await deleteFile(zipPath);
      await deleteDirectory(tmpFolderContentPath);
      await deleteDirectory(tmpFolderPath);
    } catch (error: any) {
      console.log(error.message);
    }
  });
};

export default downloadMany
