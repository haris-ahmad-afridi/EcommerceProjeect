const express = require('express');
const router=express.Router()
const {registerUser,loginUser,logout,forgotPassword,resetPassword,getUserDetails,updatePassword,updateProfile,getAllUsers,getSingleUser,updateUserRole,deleteUser,createProductReview,getProductReviews,deleteProductReview}=require("../controllers/userController")
const {isAuthenticatedUser,authorizeRoles}=require("../utils/auth")

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(logout)
router.route("/password/forgot").post(forgotPassword)
router.route("/password/reset/:token").put(resetPassword)
router.route("/me").get(isAuthenticatedUser,getUserDetails)
router.route("/password/update").put(isAuthenticatedUser,updatePassword)
router.route("/me/update").put(isAuthenticatedUser,updateProfile)
router.route("/admin/users").get(isAuthenticatedUser,authorizeRoles("admin"),getAllUsers)
router.route("/admin/user/:id").get(isAuthenticatedUser,authorizeRoles("admin"),getSingleUser)
.put(isAuthenticatedUser,authorizeRoles("admin"),updateUserRole)
.delete(isAuthenticatedUser,authorizeRoles("admin"),deleteUser)
// Reviews
router.route("/review").post(isAuthenticatedUser,createProductReview)
router.route("/reviews").get(getProductReviews).delete(isAuthenticatedUser,deleteProductReview)
module.exports=router