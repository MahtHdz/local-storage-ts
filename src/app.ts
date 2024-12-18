import cors from 'cors'
import morgan from 'morgan'
import express from 'express'
import favicon from 'serve-favicon'
import fileUpload from 'express-fileupload'

import apiRouter from './routes/api.routes'
import getRouter from './routes/get.routes'
// import corsConfig from './config/cors/corsConfig'
import updateRouter from './routes/update.routes'
import uploadRouter from './routes/upload.routes'
import deleteRouter from './routes/delete.routes'
import errorsControllers from './controllers/errors'
import downloadRouter from './routes/download.routes'

// import pkg from '../package.json'

const app = express()

//Middleware
app.use(express.json())
app.use(fileUpload())
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'))
app.use(cors(/* corsConfig */))
app.use(favicon('public/favicon.ico'))

//Routes
app.use('/', apiRouter)
app.use('/api/get', getRouter)
app.use('/api/upload', uploadRouter)
app.use('/api/update', updateRouter)
app.use('/api/delete', deleteRouter)
app.use('/api/download', downloadRouter)

app.use("*", errorsControllers.routeNotFound);

export default app