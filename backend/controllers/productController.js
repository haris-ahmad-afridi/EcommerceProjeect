const Product=require("../models/productModel")



exports.getAllProducts=async(req,res)=>{
    const product=await Product.find()
    res.status(200).json({
        success:true,
        product
    })
}


exports.createProduct=async (req,res,next)=>{
    const product=await Product.create(req.body)
    res.status(201).json({
        success:true,
        product
    })
}

exports.updateProduct=async (req,res,next)=>{
  
    let product=await Product.findById(req.params.id)
    if(!product){
        return res.status(500).json({
            success:false,
            message:"Product not found"
        })
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

}

exports.deleteProduct=async(req,res,next)=>{
    let product=await Product.findById(req.params.id)

    if(!product){
       return res.status(500).json({
            success:false,
            message:"Product Not Found"
        })
    }else{

    product=await Product.findByIdAndDelete(req.params.id)
        
        res.status(200).json({
            success:true,
            message:"Product Successfully Deleted"
            
        })
    }
  }

  exports.getProductDetails=async (req,res,next)=>{
    const product=await Product.findById(req.params.id)
    if(!product){
        // this adding "return" is necessary otherwise server would crash
       return res.status(500).json({
            success:false,
            message:"Product Not Found"

        })
    }
    res.status(200).json({
        success:true,
        product
    })
  }