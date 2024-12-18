import { config } from 'dotenv'
import { dirname } from 'path'

import app from './app'
import mongoDBConn from './database'
import models from './config/models/modelsArr'
import initializeAppConfig from './utils/init'
import { pathConstructor } from './utils/fileUtils'

declare global {
  var models: typeof import('./config/models/modelsArr').default;
  var platform: string;
  var __storagePath: string;
}

(async () => {
  config()
  initializeAppConfig()
  const host = process.env.HOST
  const port = process.env.PORT
  global.models = models
  global.platform = process.platform
  global.__storagePath = pathConstructor([dirname(__dirname), 'storage'])
  // await initializeAppConfig()
  app.listen({ port }, () => console.log(`🚀 Server ready at http://${host}:${port}`))
  mongoDBConn()
})()