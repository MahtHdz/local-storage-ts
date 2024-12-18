import fileUpload from "express-fileupload";
import { Request, Response } from "express";

import { handleFileUpload } from "@storage-api/utils/serviceUtils";
import { craftFileObject, pathConstructor } from "@storage-api/utils/fileUtils";

const uploadOne = async (req: Request, res: Response) => {
  const file = Object.values(req.files)[0];
  const ownerId = req.params.ownerId;
  const userPath = pathConstructor([global.__storagePath, ownerId]);
  const objectFile = craftFileObject(file as fileUpload.UploadedFile, ownerId, userPath);

  try {
    const fileUploaded = await handleFileUpload(file as fileUpload.UploadedFile, objectFile, userPath);
    if (!fileUploaded) throw new Error("Error: failed to upload file");
  } catch (error: any) {
    console.error(error.message);
    return res.status(400).json({ message: error.message });
  }

  return res.status(201).json({
    message: "File uploaded successfully",
  });
};

export default uploadOne
