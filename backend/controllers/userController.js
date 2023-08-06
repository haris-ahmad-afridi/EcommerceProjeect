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
        const  user=await User.create({
            name,password,email,
            avatar:{
                public_id:"this is a sample id",
                url:"profilrpicUrl"
            }
        })
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
   
    if(!user){
        return next(new ErrorHandler("Reset token Password is invalid or has been expired"))
    }
  
    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler("Password does not match",400))
    }
 
    user.password=req.body.password
    user.resetPasswordToken=undefined
    user.resetPasswordExpire=undefined;
    await user.save({})
    sendToken(user,200,res)
})
// for getting details of user ---- by user
exports.getUserDetails=catchAsyncErrors(async(req,res,next)=>{
    const user=await User.findById(req.user.id)
    res.status(200).json({
        sucess:true,
        user
    })
})
// update password by user --- user
exports.updatePassword=catchAsyncErrors(async(req,res,next)=>{
    const user=await User.findById(req.user.id).select("+password")

    const isPasswordMatched=await user.comparePassword(req.body.oldPassword)
    
    if(!isPasswordMatched){
        return next(new ErrorHandler("Old Password is incorrect",400))
    }

    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHandler("Password does not match"),400)
    }
    user.password=req.body.newPassword

    await user.save()

   sendToken(user,200,res)

})

// update profile info (name,email) by user --- user
exports.updateProfile=catchAsyncErrors(async(req,res,next)=>{
    const newUserData={
        name:req.body.name,
        email:req.body.email,
    }

    // we will add cloudnary update later
    const user=await User.findByIdAndUpdate(req.user.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
    res.status(200).send({
        sucess:true,
        user
    })
})

// get All users details --- admin
exports.getAllUsers=catchAsyncErrors(async(req,res,next)=>{
    const users=await User.find()
    res.status(200).json({
        success:true,
        users
    })
})
// get single user details --- admin
exports.getSingleUser=catchAsyncErrors(async(req,res,next)=>{
    const user=await User.findById(req.params.id)
    // this below one is also correct
    // const user=await User.find({_id:req.params.id})
    if(!user){
        return next(new ErrorHandler(`User does not exist with id:${req.params.id}`),400)
    }
    res.status(200).json({
        success:true,
        user
    })

})

// update profile Roles by admin --- admin
exports.updateUserRole=catchAsyncErrors(async(req,res,next)=>{
    const newUserData={
        name:req.body.name,
        email:req.body.email,
        roles:req.body.roles
    }

    // we will add cloudnary update later
    const user=await User.findByIdAndUpdate(req.params.id, newUserData ,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    })

    res.status(200).send({
        sucess:true,
        user
    })
})

// Delete user by admin --- admin
exports.deleteUser=catchAsyncErrors(async(req,res,next)=>{
   
    const user=await User.findById(req.params.id)
    console.log(user);

    // we will add cloudnary update later

    if(!user){
        return next(new ErrorHandler(`User Does not exist with id:${req.params.id}`))
    }
    // user.remove() has been depricated
    await user.deleteOne()

    res.status(200).send({
        sucess:true,
        "message":"User deleted successfully"
    })
})