const express = require('express');
const dotenv = require('dotenv');
const app=express()
const errorMiddleware=require("./middleware/error")
const product=require("./routes/productRoute")




dotenv.config({path:'backend/config/config.env'})
app.use(express.json())


app.use("/api/v1",product)
app.use(errorMiddleware)

module.exports=app