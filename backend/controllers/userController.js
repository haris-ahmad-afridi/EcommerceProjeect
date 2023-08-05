const validator = require('validator');
const crypto = require('crypto');
const ErrorHandler = require("../utils/errorhandler")
const catchAsyncErrors=require("../middleware/catchAsyncErrors")
const User=require("../models/userModel")
const getJWTToken=require("../models/userModel")
const sendToken = require('../utils/jwtToken');
const sendEmail=require("../utils/sendEmail")


exports. registerUser=catchAsyncErrors(async(req,res,next)=>{
    // for validating eamil. Will use it later
    //   if(validator.isEmail(req.body.email)){
    //      console.log("done");
    //   }
    //   else{
    //     console.log("undone");
    //   }
        const {name,password, email}=req.body
        console.log(password);
        const  user=await User.create({
            name,password,email,
            avatar:{
                public_id:"this is a sample id",
                url:"profilrpicUrl"
            }
        })
        console.log(user);
        sendToken(user,200,res)
        // const token=user.getJWTToken()

        // res.status(201).json({
        //     success:true,
        //     token
        // })   
})
exports.loginUser=catchAsyncErrors(async(req,res,next)=>{
    const {email,password}=req.body

    if(!email || !password){
        return next(new ErrorHandler("Please Enter or Password",404))
    }

    const user=await User.findOne({email}).select("+password")

    if(!user){
        return next(new ErrorHandler("Invalid Email or Password",401))
    }

    const isPasswordMatched=await user.comparePassword(password)
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Email or Password",401))
    }

    sendToken(user,200,res)

})
exports.logout=catchAsyncErrors(async(req,res,next)=>{
   res.cookie("token",null,{
    expires:new Date(Date.now()),
    httpOnly:true
   })

   res.status(200).json({
    sucess:true,
    message:"Logged Out"
   })
})
exports.forgotPassword=catchAsyncErrors(async(req,res,next)=>{
   
    const user=await User.findOne({email:req.body.email})
    if(!user){
        return next(new ErrorHandler("User not found",404))
    }
    const resetToken=await user.getPasswordResetToken()
    // Problem is here
    await user.save({validateBeforeSave:false})
    
    const resetPasswordUrl=`${req.protocol}://${req.get("host")} /api/v1/password/reset/${resetToken}`
    const message=`Your password reset token is : \n\n ${resetPasswordUrl}\n\nIf you have not requested this email then ignore it`
    
    try {
        await sendEmail({
            email:user.email,
            subject:"Ecommerce Password Recovery",
            message:message
        })
        res.send("Email sent")
        
    } catch (error) {
        user.resetPasswordExpire=undefined;
        user.resetPasswordToken=undefined,
        await user.save({validateBeforeSave:false})
        return next(new ErrorHandler(error.message,500))
    }
})

exports.resetPassword=catchAsyncErrors(async(req,res,next)=>{
    const resetPasswordToken=crypto.createHash("sha256").update(req.params.token).digest("hex")
    const user=await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt:Date.now()}
    })
    console.log(user);
    // console.log(user);
    // console.log(resetPasswordToken);
    if(!user){
        return next(new ErrorHandler("Reset token Password is invalid or has been expired"))
    }
    // console.log(req.body.password);
    // console.log(req.body.confirmPassword);
    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler("Password does not match",400))
    }
    // console.log(user[0].password);
    user.password=req.body.password
    user.resetPasswordToken=undefined
    user.resetPasswordExpire=undefined;
    await user.save({})
    sendToken(user,200,res)

})