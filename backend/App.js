const express = require('express');
const dotenv = require('dotenv');
const app=express()

dotenv.config({path:'backend/config/config.env'})
app.use(express.json())
const product=require("./routes/productRoute")

app.use("/api/v1",product)

module.exports=app