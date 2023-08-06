const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter Your Name"],
        maxLength:[30,"Name cannot exceed 30 Characters"],
        minLength:[4,"Name should b greater than 4 characters"]
    },
    email:{
        type:String,
        required:[true,"Please Enter Your Email"],
        unique:true,
        validator:[validator.email,"Please enter a valid email"]
    },
    password:{
        type:String,
        required:[true,"Please Enter Your Password"],
        minLength:[8,"Name should b greater than 8 characters"],
        select:false

    },
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        },
    },
    roles:{
        type:String,
        default:"user"
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,
})
// if password is modified then it will change and hash otherwise the passwprd would be the same hash password
userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
         next()
    }
   this.password=await bcrypt.hash(this.password,10)
})
// call getJWTToken method and make jwt token for a user
userSchema.methods.getJWTToken=function(){
   return jwt.sign({id:this._id},process.env.JWT_SECRET,{
    expiresIn:process.env.JWT_EXPIRE,
   })
}
userSchema.methods.comparePassword=async function(enteredPassword){
  return await bcrypt.compare(enteredPassword,this.password)
}
userSchema.methods.getPasswordResetToken=async function(){
    const resetToken=crypto.randomBytes(20).toString("hex")
    console.log(resetToken)
    this.resetPasswordToken=crypto.createHash("sha256").update(resetToken).digest("hex")
    this.resetPasswordExpire=Date.now() +15 * 60 * 1000
    return resetToken
}

module.exports=mongoose.model("user",userSchema)