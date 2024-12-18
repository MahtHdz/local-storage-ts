import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

import {
  copyFile,
  createFolder,
  zipFolder,
  pathConstructor,
  deleteFileOrFolder,
  removeFilesInFolder
} from '@storage-api/utils/fileUtils'

import File from '@storage-api/models/file.model';

interface CustomRequest extends Request {
  body: {
    ids: string[]
  }
}

const downloadMany = async (req: CustomRequest, res: Response) => {
  let response = null;
  const { ids } = req.body ?? { ids: []};
  const tmpFolderName = `tmp_${uuidv4()}`;
  const tmpFolderPath = pathConstructor([
    global.__storagePath,
    "tmp",
    tmpFolderName,
  ]);
  const tmpFolderContentPath = pathConstructor([tmpFolderPath, "content"]);
  try {
    await createFolder(tmpFolderPath);
  } catch (error: any) {
    return res.status(400).json(error.message);
  }
  try {
    await createFolder(tmpFolderContentPath);
  } catch (error: any) {
    return res.status(400).json(error.message);
  }
  try {
    response = await File.find({ _id: { $in: ids } });
  } catch (error: any) {
    return res.status(404).json(error.message);
  }
  for (let i = 0; i < response.length; i++) {
    const file = response[i];
    const filepath = file.filepath;
    const filename = file.filename;
    const destination = pathConstructor([tmpFolderContentPath, filename]);
    try {
      await copyFile(filepath, destination);
    } catch (error: any) {
      return res.status(404).json(error.message);
    }
  }
  const zipName = `${uuidv4()}.zip`;
  const zipPath = pathConstructor([tmpFolderPath, zipName]);
  // console.log('zipPath', zipPath)
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
      await deleteFileOrFolder(zipPath);
      await deleteFileOrFolder(tmpFolderContentPath);
      await deleteFileOrFolder(tmpFolderPath);
    } catch (error: any) {
      console.log(error.message);
    }
  });
};

export default downloadMany