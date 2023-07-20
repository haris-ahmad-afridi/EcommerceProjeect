const express = require('express');
const dotenv = require('dotenv');

dotenv.config({path:'backend/config/config.env'})

const app=express()
const product=require("./routes/productRoute")

app.use("/api/v1",product)

module.exports=app