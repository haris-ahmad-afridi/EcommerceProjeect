const express = require('express');
const {getAllProducts,createProduct,updateProduct,deleteProduct,getProductDetails}=require("../controllers/productController")
const {isAuthenticatedUser,authorizeRoles}=require("../utils/auth")
const router=express.Router()

router.route("/products").get(getAllProducts)
router.route("/admin/products/new").post(isAuthenticatedUser,authorizeRoles("admin"),createProduct)
router.route("/admin/products/:id").put(isAuthenticatedUser,authorizeRoles("admin"),updateProduct)
.delete(isAuthenticatedUser,authorizeRoles("admin"),deleteProduct)
router.route("/product/:id").get(getProductDetails)

module.exports=router