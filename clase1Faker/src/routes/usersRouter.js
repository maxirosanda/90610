import { Router } from "express";
import { generateUser } from "../utils/faker.js";

const router = Router()

router.get('/:number',(req,res)=>{
    const {number} = req.params
    const users = []
    for(let i = 0; i < number; i++) {
        users.push(generateUser())
      }
    res.send({status:'success',payload:users})
})


export default router