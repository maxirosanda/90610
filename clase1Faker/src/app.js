import express from 'express'
import usersRouter from './routes/usersRouter.js'

const app = express()

app.use(express.json())

app.use('/api/users',usersRouter)

app.listen(8080,console.log('server run in port 8080'))