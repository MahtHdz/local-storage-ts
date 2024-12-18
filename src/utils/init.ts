import { createFolder, pathConstructor, fileOrFolderExist } from "./fileUtils";

const initializeAppConfig = async () => {
  const storageFolderValidation = await fileOrFolderExist("storage");
  const tmpFolderPath = pathConstructor([global.__storagePath, "tmp"]);
  const tmpFolderValidation = await fileOrFolderExist(tmpFolderPath);
  if (!storageFolderValidation) {
    try {
      await createFolder(global.__storagePath);
    } catch (error: any) {
      console.error(error.message);
    }
  }
  if (!tmpFolderValidation) {
    try {
      await createFolder(tmpFolderPath);
    } catch (error: any) {
      console.error(error.message);
    }
  }
};

export default initializeAppConfig;
