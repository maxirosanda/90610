import express from "express";
import { suma,resta,division,multiplicacion } from "clase2subirpaquetenpm";
import { logger } from "./utils/loggers.js";
import { addLogger } from "./middlewares/loggerHttp.js";
import cluster from "cluster"
import { cpus } from "os";

const app = express()

app.use(express.json())
app.use(addLogger)

app.get("/suma/:a/:b",(req,res)=>{
    const {a,b} = req.params
    logger.warn(`suma ${a} y ${b} ${req.method} ${new Date().toLocaleTimeString()}`)
    const result = suma(Number(a),Number(b))
    res.status(200).json({status:"success",payload:result})
})

app.get("/resta/:a/:b", (req, res) => {
    const { a, b } = req.params;
    const result = resta(Number(a),Number(b))
    res.status(200).json({status:"success",payload:result})
});


app.get("/multi/:a/:b", (req, res) => {
    const { a, b } = req.params;
    const result = multiplicacion(Number(a),Number(b))
    res.status(200).json({status:"success",payload:result})
});

app.get("/divi/:a/:b", (req, res) => {
    const { a, b } = req.params;
    const result = division(Number(a),Number(b))
    res.status(200).json({status:"success",payload:result})
});

app.get('/calculo-bloq',(req,res)=> {
    let result = 0
    for(let i = 0; i < 5e9; i++) {
        result += i
    }
    res.send({result})

})


if(cluster.isPrimary) {
    for(let i = 0; i < cpus().length;i++){
        cluster.fork()
    }

    cluster.on("exit",worker => {
        logger.error("exit process: " + worker.process.pid + " " + new Date().toLocaleDateString())
        cluster.fork()
    })
}
if(cluster.isWorker) {
    app.listen(8080,()=>logger.info(`Process ${process.pid } Listening on 8080`))
}