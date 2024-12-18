import { Schema, model } from "mongoose"

import IFile from "@storage-api/interfaces/models/IFile"
import { timestampCST } from "@storage-api/utils/dateUtils"

// Data Schema
const fileSchema = new Schema<IFile>(
  {
    filename: {
      type: String,
      required: true
    },
    alias: {
      type: String,
      required: true,
      unique: true
    },
    filepath: {
      type: String,
      required: true,
      unique: true,
    },
    size: {
      type: Number,
      required: true,
    },
    extension: {
      type: String,
      required: true,
    },
    owner: {
      type: String,
      required: true
    },
    status: {
      type: Boolean,
      default: true,
      required: true,
    }
  },
  {
    timestamps: { currentTime: () =>  timestampCST() },
    versionKey: false,
    collection: "files",
  }
)

const File = model("files", fileSchema)
export default File