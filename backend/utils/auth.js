const jwt = require("jsonwebtoken");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("./errorhandler");
const User = require("../models/userModel");

exports.isAuthenticatedUser=catchAsyncErrors(async(req,res,next)=>{
    const {token} =req.cookies
    if(!token){
    return next(new ErrorHandler("Please Login first",401))
    }
    const decodeUser=jwt.verify(token,process.env.JWT_SECRET)
    // this line means that after login all the data of user is saved in request as req.user
    req.user=await User.findById(decodeUser.id)
    next()
    
})
exports.authorizeRoles=(...roles)=>{
    return (req,res,next)=>{
      if(!roles.includes(req.user.roles)) {
          return next(new ErrorHandler(`Roles:${req.user.roles} is not allowed to access this resource.`,403))
      }
      next()
    }
  }