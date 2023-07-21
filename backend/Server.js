const app =require("./App")
const express = require('express');
const connectToDatabase =require("./config/database")


// app.use(express.json())
connectToDatabase()


app.listen(process.env.PORT,()=>{
    console.log(`app is listening port ${process.env.PORT}`);
})