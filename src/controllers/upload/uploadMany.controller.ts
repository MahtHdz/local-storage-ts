import fileUpload from "express-fileupload";
import { Request, Response } from "express";

import { handleFileUpload } from "@storage-api/utils/serviceUtils";
import { craftFileObject, pathConstructor } from "@storage-api/utils/fileUtils";

const uploadMany = async (req: Request, res: Response) => {
  const files = Object.values(req.files)[0];
  const ownerId = req.params.ownerId;
  const userPath = pathConstructor([global.__storagePath, ownerId]);

  if (!Array.isArray(files)) {
    return res.status(400).json({ message: "Error: files must be an array" });
  }

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const objectFile = craftFileObject(file as fileUpload.UploadedFile, ownerId, userPath);
    try {
      const fileUploaded = await handleFileUpload(file as fileUpload.UploadedFile, objectFile, userPath);
      if (!fileUploaded) throw new Error("Error: failed to upload file");
    } catch (error: any) {
      console.error(error.message);
      return res.status(400).json({ message: error.message });
    }
  }

  return res.status(201).json({
    message: "Files uploaded successfully",
  });
};

export default uploadMany
