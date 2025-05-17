export default (error,req,res,next) => {
    if(error.code){
        res.json({  status:"error",
                    name:error.name,
                    message:error.message,
                    cause:error.cause
        })
    }else{
        res.json({status:"error",cause:error.cause})
    }

}