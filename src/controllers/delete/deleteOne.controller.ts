import { startSession } from "mongoose";
import { Request, Response } from "express";

import File from "@storage-api/models/file.model";
import { deleteFile } from "@storage-api/utils/fileUtils";

const deleteOne = async (req: Request, res: Response) => {
  const session = await startSession();
  session.startTransaction();

  try {
    const fileId = req.params.id;

    if (!fileId) {
      await session.abortTransaction();
      session.endSession();
      return res
        .status(400)
        .json({ message: "Missing required parameter: id" });
    }

    const foundFile = await File.findOneAndDelete({ _id: fileId }, { session });

    if (!foundFile) {
      await session.abortTransaction();
      session.endSession();
      return res
        .status(404)
        .json({ message: `File with id ${fileId} not found` });
    }

    try {
      await deleteFile(foundFile.filepath);
    } catch (error: any) {
      // Rollback the database deletion if file deletion fails
      await session.abortTransaction();
      session.endSession();
      return res
        .status(500)
        .json({ message: "File deletion failed", error: error.message });
    }

    // Commit the transaction if both deletions are successful
    await session.commitTransaction();
    session.endSession();
    return res.status(204).send();
  } catch (error: any) {
    // Handle any other errors and rollback the transaction
    await session.abortTransaction();
    session.endSession();
    return res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

export default deleteOne;
