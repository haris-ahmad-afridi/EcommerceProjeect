class ErrorHandler extends Error{
    constructor(message,statusCode){
        super(message),
        this.message=message;
        this.statusCode=statusCode
        // search for this
        Error.captureStackTrace(this,this.constructor)
    }
}
module.exports=ErrorHandler

