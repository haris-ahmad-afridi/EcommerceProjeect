const Product=require("../models/productModel")
const ErrorHandler = require("../utils/errorhandler")
const catchAsyncErrors=require("../middleware/catchAsyncErrors")
const ApiFeatures=require("../utils/apifeatures")


exports.getAllProducts=catchAsyncErrors(async(req,res)=>{

    const resultperpage=8
    const productCount=await Product.countDocuments()
    let apiFeatures=new ApiFeatures(Product.find(),req.query).filter()
    .search()
    .pagination(resultperpage)
    const product=await apiFeatures.query
    res.status(200).json({
        success:true,
        product,
        productCount
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