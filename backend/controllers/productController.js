const Product=require("../models/productModel")
const ErrorHandler = require("../utils/errorhandler")
const catchAsyncErrors=require("../middleware/catchAsyncErrors")


exports.getAllProducts=catchAsyncErrors(async(req,res)=>{
    const product=await Product.find()
    res.status(200).json({
        success:true,
        product
    })
})


exports.createProduct=catchAsyncErrors(async (req,res,next)=>{
    const product=await Product.create(req.body)
    res.status(201).json({
        success:true,
        product
    })
})

exports.updateProduct=catchAsyncErrors(async (req,res,next)=>{
  
    let product=await Product.findById(req.params.id)
    if(!product){
        return next(new ErrorHandler("Product not found",404))
    }
    product=await Product.findByIdAndUpdate(req.params.id,req.body,{
        // search for this
            new:true,
            runValidators:true,
            useFindAndModify:false
        
        })
        res.status(200).send({
            success:true,
            product
        })

})
exports.deleteProduct=catchAsyncErrors(async(req,res,next)=>{
    let product=await Product.findById(req.params.id)

    if(!product){
    return next(new ErrorHandler("Product not found",404))
    }else{

    product=await Product.findByIdAndDelete(req.params.id)
        
        res.status(200).json({
            success:true,
            message:"Product Successfully Deleted"
            
        })
    }

})

  exports.getProductDetails=catchAsyncErrors(async (req,res,next)=>{
  
    let product=await Product.findById(req.params.id)
    if(!product){
        // using this "retrun" word is necessary otherwise error would arise
        // return res.status(500).json({
        //     success:false,
        //     message:"Product not found"
        // })
        return next(new ErrorHandler("Product not found",404))
    }
    product=await Product.findByIdAndUpdate(req.params.id,req.body,{
        // search for this
            new:true,
            runValidators:true,
            useFindAndModify:false
        
        })
        res.status(200).send({
            success:true,
            product
        })

})