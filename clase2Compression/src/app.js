import express from 'express'
import compression from 'express-compression'
import error from './middlewares/error.js'

import usersRouter from './routes/users.route.js'

const app = express()

app.use(express.json())

app.use(compression({
    brotli:{enable:true,zlib:{}},
    threshold:1024,
    filter:(req,res) =>{
        const extesion = req.url.split('.').pop()
        const noCompressTypes = ["jpg","jpeg","png","gif","mp4"]
        return !noCompressTypes.includes(extesion)
    }
}))

app.get("/stringlargo",(req,res)=>{
    let string = "Hola coders, soy un string muy largo"
    for(let i = 0 ; i < 10e5;i++){
        string += "Hola coders, soy un string muy largo"
    }
    res.status(200).json({status:'success',message:string})
})

app.use('/api/users',usersRouter)
app.use(error)

app.listen(8080,()=> console.log("server in port 8080"))