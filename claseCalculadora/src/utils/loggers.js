import winston from "winston";
import { options } from "../config/commander.js";


const levelAndColors = {
    levels:{
        fatal:0,
        error:1,
        warn:2,
        info:3,
        http:4
    },
    colors:{
        fatal:"red",
        error:"orange",
        warn:"yellow",
        info:"blue",
        http:"green"
    }
}



const loggerDev = winston.createLogger({
    levels:levelAndColors.levels,
    transports:[
        new winston.transports.Console({
            level:"http",
            format:winston.format.combine(
                winston.format.colorize({colors:levelAndColors.colors}),
                winston.format.simple()
            )
        })
    ]
})

const loggerProd = winston.createLogger({
    levels:levelAndColors.levels,
    transports:[
        new winston.transports.File({
            filename:"./errors.log",
            level:"warn",
            format:winston.format.simple()
        }),

    ]
})

export const logger = options.mode === "prod" ? loggerProd : loggerDev