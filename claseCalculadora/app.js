import express from "express";
import { suma,resta,division,multiplicacion } from "clase2subirpaquetenpm";


const app = express()

app.use(express.json())

app.get("/suma/:a/:b",(req,res)=>{
    const {a,b} = req.params
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




app.listen(8080,()=> console.log("server in port 8080"))