import dotenv from 'dotenv'
import options from './commander.js'

dotenv.config({
    path: options.mode === "production" ? ".env.prod" : ".env.dev"
})

export default {
    port: process.env.PORT,
    mongoUri: process.env.MONGO_URI
}