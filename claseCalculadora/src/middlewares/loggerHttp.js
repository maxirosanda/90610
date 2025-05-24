import { logger } from "../utils/loggers.js"

export const addLogger = (req,res,next) => {

    req.logger = logger
    req.logger.http(`${req.url} ${req.method} ${new Date().toLocaleTimeString()}`)
    next()

}