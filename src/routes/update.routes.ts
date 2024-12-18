import { Router } from 'express'

import updateControllers from '@storage-api/controllers/update'

const updateRouter = Router()

updateRouter.put('/document/:id', updateControllers.updateOne)
// updateRouter.put('/many', commonMiddlewares, commonControllers.updateMany)

export default updateRouter