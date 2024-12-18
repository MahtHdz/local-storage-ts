import { platform } from "os";
import { PathLike } from "fs";
import { promisify } from "util";
import { v4 as uuidv4 } from "uuid";
import { exec } from "child_process";
import {
  mkdir,
  rmdir,
  unlink,
  access,
  rename,
  readdir,
  readFile,
  writeFile,
  constants,
  copyFile as nodeCopyFile,
} from "fs/promises";
import {
  dirname,
  extname,
  basename,
  join as ptJoin,
  resolve as ptResolve,
} from "path";
import fileUpload from "express-fileupload";
import IFile from "@storage-api/interfaces/models/IFile";
import allowedFileTypes from "@storage-api/constants/fileTypes";
import IZipFileObj from "@storage-api/interfaces/utils/IZipFileObj";

export const executeCommand = async (command: string) => {
  let output = null;
  const execPromisified = promisify(exec);
  try {
    const { stdout, stderr } = await execPromisified(command);
    if (stderr) {
      throw new Error(`Error: ${stderr}`);
    }
    output = `Output: ${stdout}`;
    // console.log(output)
  } catch (error: any) {
    console.error(`Error -> ${error.message}`);
  }
  return output;
};

export const pathConstructor = (pathArr: PathLike[]) => {
  let finalPath = "";
  const isWin = platform() === "win32";
  if (isWin) {
    for (let i = 0; i < pathArr.length; i++) {
      if (i !== pathArr.length - 1) finalPath += `${pathArr[i]}\\`;
      else finalPath += pathArr[i];
    }
  } else {
    for (let i = 0; i < pathArr.length; i++) {
      if (i !== pathArr.length - 1) finalPath += `${pathArr[i]}/`;
      else finalPath += pathArr[i];
    }
  }
  return finalPath;
};

export const copyFile = async (originalPath: PathLike, newPath: PathLike) => {
  let succeeded = false;
  try {
    await nodeCopyFile(originalPath, newPath);
    succeeded = true;
  } catch (error: any) {
    console.error(error.message);
  }
  return succeeded;
};

export const fileOrFolderExist = async (path: PathLike) => {
  let wasFound = false;
  try {
    await access(path, constants.R_OK | constants.W_OK);
    wasFound = true;
  } catch (error: any) {
    console.error(error.message);
  }
  return wasFound;
};

export const deleteFile = async (path: PathLike) => {
  let wasDeleted = false;
  try {
    await unlink(path);
    wasDeleted = true;
  } catch (error: any) {
    console.error({ message: error.message });
  }
  return wasDeleted;
};

export const deleteDirectory = async (path: PathLike) => {
  let wasDeleted = false;
  try {
    await rmdir(path, {
      recursive: true,
    });
    wasDeleted = true;
  }catch (error: any) {
    console.error({ message: error.message });
  }
  return wasDeleted;
};

export const deleteDirectoryContent = async (path: PathLike) => {
  let wasDeleted = false;
  try {
    const entries = await readdir(path, { withFileTypes: true });
    for (const entry of entries) {
      const thisPath = ptResolve(path.toString(), entry.name);
      if (await fileOrFolderExist(thisPath)) {
        if (entry.isDirectory()) {
          await deleteDirectory(thisPath);
        } else {
          await deleteFile(thisPath);
        }
      }
    }
    wasDeleted = true;
  }
  catch (error: any) {
    console.error({ message: error.message });
  }
  return wasDeleted;
};

export const deleteFileOrFolder = async (path: PathLike) => {
  let isAFile = true;
  let wasFound = false;
  let validPath = false;
  try {
    validPath = await fileOrFolderExist(path);
    await readFile(path);
  } catch (error) {
    isAFile = false;
  }
  if (!validPath) return wasFound;
  if (!isAFile) {
    try {
      const entries = await readdir(path, { withFileTypes: true });
      for (const entry of entries) {
        const thisPath = ptResolve(path.toString(), entry.name);
        if (await fileOrFolderExist(thisPath)) {
          if (entry.isDirectory()) {
          }
          entry.isDirectory() && (await deleteFileOrFolder(thisPath));
          entry.isFile() && (await unlink(thisPath));
        }
      }
      await rmdir(path);
      wasFound = true;
    } catch (error: any) {
      console.error(error.message);
      return wasFound;
    }
  } else {
    await unlink(path);
    wasFound = true;
  }
  return wasFound;
};

export const createFolder = async (path: PathLike, recursive = false) => {
  let wasCreated = false;
  const options = { recursive };
  try {
    await mkdir(path, options);
    wasCreated = true;
  } catch (error: any) {
    console.error(error.message);
  }
  return wasCreated;
};

export const getFolderContent = async (path: PathLike) => {
  let content = null;
  try {
    content = await readdir(path, { withFileTypes: true });
  } catch (error: any) {
    console.error(error.message);
  }
  return content;
};

export const removeFilesInFolder = async (folderPath: PathLike) => {
  let succeeded = false;
  try {
    const folderContent = await getFolderContent(folderPath);
    // console.log(folderContent)
    for (const file of folderContent!) {
      await deleteFileOrFolder(pathConstructor([folderPath, file.name]));
    }
    succeeded = true;
  } catch (error: any) {
    console.error(error.message);
  }
  return succeeded;
};

export async function writeDataToFile(
  data: any,
  filename: string,
  append = false,
  extension?: string
): Promise<boolean> {
  const dataFile = extension === "json" ? JSON.stringify(data) : data;
  let success = false;
  try {
    await writeFile(
      `${filename}${extension ? `.${extension}` : ""}`,
      dataFile,
      {
        flag: append ? "a+" : "w",
      }
    );
    success = true;
  } catch (error: any) {
    console.error(error.message);
  }
  return success;
}

export const saveFileInLocalStorage = async (
  file: fileUpload.UploadedFile,
  userPath: PathLike,
  filepath: PathLike
) => {
  let wasSaved = false;
  let userFolderExists = false;
  if (userPath === null) return wasSaved;
  try {
    userFolderExists = await fileOrFolderExist(userPath);
  } catch (error: any) {
    console.error(error.message);
  }
  if (!userFolderExists) {
    try {
      await createFolder(userPath);
    } catch (error: any) {
      console.error(error.message);
    }
  }
  try {
    file.mv(filepath.toString(), (error) => {
      if (error) throw new Error(error.message);
    });
  } catch (error: any) {
    console.error(error.message);
    return wasSaved;
  }
  wasSaved = true;
  return wasSaved;
};

export const craftFileObject = (
  file: fileUpload.UploadedFile,
  ownerId: string,
  userPath: PathLike
): IFile => {
  try {
    if (!file) throw new Error("Error: no file provided");
  } catch (error: any) {
    console.error(error.message);
    return null;
  }
  try {
    const fileType = allowedFileTypes[file.mimetype as keyof typeof allowedFileTypes];
    if(!fileType) throw new Error("Error: file type not supported");
  } catch (error: any) {
    console.error(error.message);
    return null;
  }
  const nameSegments = file.name.split(".");
  const extensionFile =
    nameSegments.length > 1 ?
    nameSegments[nameSegments.length - 1] : "";
  const alias = `${uuidv4()}.${extensionFile}`;
  const filePath = pathConstructor([userPath, alias]);
  const extension = extname(file.name).replace(".", "") ?? "";
  return {
    filename: file.name,
    alias,
    filepath: filePath,
    size: file.size,
    extension,
    owner: ownerId,
    status: true,
  }
};

/**
 * @summary Unzip a file
 * @param zipFileObj
 * @param zipFileObj.filepath - Path to the file to unzip
 * @param zipFileObj.destination - Path where the file will be unzipped
 * @param zipFileObj.type - Type of the file to unzip
 * @returns succeeded
 */
export const unzipFile = async (zipFileObj: IZipFileObj) => {
  type ZipType = "application/zip";
  const unzipSystemCommand =
    platform() === "win32"
      ? `powershell Expand-Archive ${zipFileObj.filepath} -DestinationPath ${zipFileObj.destination}`
      : `unzip ${zipFileObj.filepath} -d ${zipFileObj.destination}`;
  let succeeded = false;
  if (
    !zipFileObj?.type ||
    (zipFileObj?.type as unknown as string) !== "application/zip"
  )
    return succeeded;
  try {
    await createFolder(zipFileObj.destination);
  } catch (error: any) {
    console.error(error.message);
    return succeeded;
  }
  try {
    await executeCommand(unzipSystemCommand);
    succeeded = true;
  } catch (error: any) {
    console.error(error.message);
  }
  return succeeded;
};

/**
 * @summary Compress a file
 * @param filepath - Path to the file to compress
 * @param destinationPath - Path where the file will be compressed
 * @returns succeeded
 */
export const zipFolder = async (folderPath: PathLike, destinationPath: PathLike) => {
  const zipSystemCommand =
    platform() === "win32"
      ? `powershell Compress-Archive -Path ${folderPath}\\* -DestinationPath ${destinationPath}`
      : `zip -r -j ${destinationPath} ${folderPath}/*`;
  let succeeded = false;
  try {
    await executeCommand(zipSystemCommand);
    succeeded = true;
  } catch (error: any) {
    console.error(error.message);
  }
  return succeeded;
};

const fileUtils = {
  copyFile,
  createFolder,
  executeCommand,
  writeDataToFile,
  pathConstructor,
  craftFileObject,
  fileOrFolderExist,
  deleteFileOrFolder,
  removeFilesInFolder,
};

export default fileUtils;
