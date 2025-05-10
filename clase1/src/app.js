import config from './config/config.js'
import express from 'express'
import { fork } from 'child_process'

const app = express()

app.use(express.json())

process.on('exit',code => {
    console.log("sali y el codigo es " + code)
})

app.get('/salir',(req,res)=>{
    process.exit(1)
})

let counter = 0
app.get('/saludo',(req,res)=>{
    counter++
    res.send("hola " + counter )
})

app.get('/calculo-bloq',(req,res)=> {
    let result = 0
    for(let i = 0; i < 5e9; i++) {
        result += i
    }
    res.send({result})

})


app.get('/calculo-nobloq',(req,res)=> {
    const child = fork("./operacionCompleja.js")
    child.send('')
    child.on('message',result => {
        res.send({result})
    })

})




app.listen(8080,() => console.log("server run in port " + config.port))