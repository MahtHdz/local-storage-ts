import { PathLike } from "fs";
import { startSession } from "mongoose";
import fileUpload from "express-fileupload";

import File from "@storage-api/models/file.model";
import { saveFileInLocalStorage, deleteFile } from "./fileUtils";

import IFile from "@storage-api/interfaces/models/IFile";

export const handleFileUpload = async (
  file: fileUpload.UploadedFile,
  fileObj: IFile,
  userPath: PathLike
): Promise<boolean> => {
  const session = await startSession();
  session.startTransaction();
  let fileSaved = false;

  try {
    // Save the file to local storage
    fileSaved = await saveFileInLocalStorage(file, userPath, fileObj.filepath);
    if (!fileSaved) {
      throw new Error(
        `Error: failed to save file ${file.name} in local storage`
      );
    }

    // Save the file information to the database within the transaction
    const [newFile] = await File.create([fileObj], { session });
    if (!newFile) {
      throw new Error("Error: failed to save file in database");
    }

    // Commit the transaction
    await session.commitTransaction();
    return true;
  } catch (error: any) {
    // Abort the transaction
    await session.abortTransaction();

    // If the file was saved but the database operation failed, delete the file from local storage
    if (fileSaved) {
      try {
        await deleteFile(fileObj.filepath);
      } catch (fsError: any) {
        console.error(
          `Failed to delete file from filesystem: ${fsError.message}`
        );
      }
    }

    console.error(`File upload failed: ${error.message}`);
    return false;
  } finally {
    // End the session in the finally block to ensure it's called regardless of success or failure
    session.endSession();
  }
};
