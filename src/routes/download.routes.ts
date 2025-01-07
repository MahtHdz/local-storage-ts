import { Router } from 'express';

import downloadControllers from '@storage-api/controllers/download';

const downloadRouter = Router()

downloadRouter.post("/file/:id", downloadControllers.downloadOne);
downloadRouter.post("/files", downloadControllers.downloadMany);

export default downloadRouter