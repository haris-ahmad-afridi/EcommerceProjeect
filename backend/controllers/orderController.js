const Product=require("../models/productModel")
const ErrorHandler = require("../utils/errorhandler")
const catchAsyncErrors=require("../middleware/catchAsyncErrors")
const Order = require("../models/orderModel")



// creating new offer
exports.newOrder=catchAsyncErrors(async(req,res,next)=>{
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        user
    }=req.body
    const order=await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt:Date.now(),
        user:req.user._id
    })

    res.status(201).json({
        success:true,
        order
    })
})
// getting a single order
exports.getSingleOrder=catchAsyncErrors(async(req,res,next)=>{

    const order=await Order.findById(req.params.id).populate(
        "user",
        "name email"
    )

    if(!order){
        return next(new ErrorHandler("Order not Found with this id",404))
    }

    res.status(200).json({
        success:true,
        order
    })
   
})
// get logged-in user orders
exports.myOrder=catchAsyncErrors(async(req,res,next)=>{
    const order=await Order.find({user:req.user._id})

    res.status(200).json({
        success:true,
        order
    })
})
// get all orders ---Admin
exports.getAllOrders=catchAsyncErrors(async(req,res,next)=>{
    const orders=await Order.find()

    let totalAmount=0

    orders.forEach((order)=>{
        totalAmount+=order.totalPrice
    })

    res.status(200).json({
        success:true,
        totalAmount,
        orders
    })
})

// update Order status ---admin
exports.updateOrder=catchAsyncErrors(async(req,res,next)=>{
    const order=await Order.findById(req.params.id)
    console.log(req.body.status);
    

    if(order.orderStatus==="Delivered"){
        return next(new ErrorHandler("You have already delivered this product"))
    }

    order.orderItems.forEach(async(order)=>{
        await updateStock(order.product,order.quantity)
    })
    
    

    order.orderStatus=req.body.status

    if(req.body.status==="Delivered"){
        order.deliveredAt=Date.now()
    }
    await order.save({validateBeforeSave:false})
    res.status(200).json({
        success:true,
    })
})

async function updateStock(id,quantity){
  const product=await Product.findById(id)
  product.stock -=quantity
  await product.save({ validateBeforeSave:false })

}

// delete order ---admin
exports.deleteOrder=catchAsyncErrors(async(req,res,next)=>{
    const order=await Order.findById(req.params.id)
    if(!order){
        return next(new ErrorHandler("Order not found with this id"))
    }

    await order.deleteOne()
    res.status(200).json({
        success:true
   })
})