import { Router } from 'express'

import uploadControllers from '@storage-api/controllers/upload'

const uploadRouter = Router()

uploadRouter.post('/file/:ownerId', uploadControllers.uploadOne);
uploadRouter.post("/files/:ownerId", uploadControllers.uploadMany);

export default uploadRouter