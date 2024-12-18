// import fileTypes from "@storage-api/config/static/fileTypes.json"
import allowedFileTypes from "@storage-api/constants/fileTypes";
import { PathLike } from "fs";

export default interface IZipFileObj {
  filepath: PathLike;
  destination: PathLike;
  type: keyof typeof allowedFileTypes;
}