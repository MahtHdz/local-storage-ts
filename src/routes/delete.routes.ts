import { Router } from 'express'

import deleteControllers from '@storage-api/controllers/delete';

const deleteRouter = Router()

deleteRouter.delete("/file/:id", deleteControllers.deleteOne);
deleteRouter.post("/files", deleteControllers.deleteMany);

export default deleteRouter