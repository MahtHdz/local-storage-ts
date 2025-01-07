import { startSession } from "mongoose";
import { Request, Response } from "express";

import File from "@storage-api/models/file.model";
import { deleteFile } from "@storage-api/utils/fileUtils";
import IFile from "@storage-api/interfaces/models/IFile";

interface CustomRequest extends Request {
  body: {
    ids: string[];
  };
}

const deleteMany = async (req: CustomRequest, res: Response) => {
  const filesIds = req.body.ids;
  const session = await startSession();

  try {
    // Start the transaction
    session.startTransaction();

    // 1. Find the files in a transaction session
    const files: IFile[] = await File.find({ _id: { $in: filesIds } })
      .session(session)
      .exec();
    // If the number of found files doesn't match what's requested,
    // at least one file does not exist in DB
    if (!files || files.length !== filesIds.length) {
      throw new Error("One or more files not found");
    }

    // 2. Attempt to delete files from local storage (OUTSIDE of DB writes)
    //    If this step fails, we abort the transaction before any DB changes
    for (const file of files) {
      await deleteFile(file.filepath);
    }

    // 3. Now that local deletions succeeded, delete the documents from DB
    await File.deleteMany({ _id: { $in: filesIds } }).session(session);

    // 4. Commit the transaction
    await session.commitTransaction();
    return res.status(204).send();
  } catch (error: any) {
    // If any step above fails, roll back the transaction
    await session.abortTransaction();
    return res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  } finally {
    // End the session regardless of success or failure
    session.endSession();
  }
};

export default deleteMany;
