import express from 'express'
import mongoose from 'mongoose'

import todoRouter from '@/app/routes/todo.routes'
import userRouter from '@/app/routes/user.routes'
import { appConfig } from '@/infrastructure/config/config'
import corsMiddleware from '@/infrastructure/middleware/cors.middleware'

const app = express()
const { serverPort, dbUrl } = appConfig
const PORT = serverPort

app.use(corsMiddleware)
app.use(express.json())

app.use('/api/user', userRouter)
app.use('/api/todos', todoRouter)

const start = async () => {
    try {
        await mongoose.connect(dbUrl)

        app.listen(PORT, () => {
            console.log('Server started on port ', PORT)
        })
    } catch (e) {
        console.log(e)
    }
}

start()
