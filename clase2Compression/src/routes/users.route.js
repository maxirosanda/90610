import { Router } from "express";
import { EErrors } from '../utils/errors/enums.js'
import { generateUserErrorInfo, generateUserErrorParam } from '../message.js'
import CustomError from '../utils/errors/customError.js'

const router = Router()

const users = []

router.get('/',(req,res)=>{
    res.status(200).json({status:'success',payload:users})
})

router.get('/:uid',(req,res)=>{
    const {uid} = req.params
    const parsedUid = Number(uid)
    if(isNaN(parsedUid) || parsedUid <= 0){
        CustomError.createError({
            name:"Invalid Parameter",
            cause:"",
            message:generateUserErrorParam(parsedUid),
            code:EErrors.INVALID_PARAM
        })
    }
    res.status(200).json({status:'success',payload:users})
})



router.post("/",(req,res) => {

    const {first_name, last_name, email} = req.body

    if(!first_name || !last_name || !email){

        CustomError.createError({
            name:"User creation error",
            cause:"djgisdgjhsa lksdjfiodfjdsiof sdifj sdij",
            message:generateUserErrorInfo({first_name, last_name, email}),
            code:EErrors.INVALID_PARAM
        })
    }

    const user = {
        first_name,
        last_name,
        email
    }

    if (users.length === 0) {
        user.id = 1;
    } else {
        user.id = users[users.length - 1].id + 1;
    }

    users.push(user)
    res.send({status:"success",payload:user})

})



export default router