const ErrorHandler=require("../utils/errorhandler")

module.exports=(err,req,res,next)=>{
    err.statusCode=err.statusCode || 500,
    err.message=err.message || "Internal server error"

    // wrong mongodb id error
    if(err.name==="CastError"){
        const message=`Resources not Found, Invalid:${err.path}`
        err= new ErrorHandler(message,404)
    }
    // MongoDB duplicate key error
    if(err.code ===11000){
        const message=`Duplicate ${Object.keys(err.keyValue)} Entered`
        err=new ErrorHandler(message, 400)
    }
    // Wrong JWT Token
    if(err.name==="JsonWebTokenError"){
        const message=`Json Wen Token id invalid,try again`
        err=new ErrorHandler(message,400)
    }
    // JWT Expire Error
    if(err.name==="TokenExpiredError"){
        const message=`Json Wen Token id Expired ,try again`
        err=new ErrorHandler(message,400)
    }

    res.status(err.statusCode).json({
        success:false,
        message:err.message

    })
}