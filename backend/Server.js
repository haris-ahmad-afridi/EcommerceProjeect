const app =require("./App")
const express = require('express');
const connectToDatabase =require("./config/database")

// for handing uncaught error. Must be declared at top
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down server due to uncaughtException`);
    process.exit(1)
})


// app.use(express.json())
connectToDatabase()


const server= app.listen(process.env.PORT,()=>{
    console.log(`app is listening port ${process.env.PORT}`);
})

// for handing unhandledRejection
process.on("unhandledRejection",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down server due to unhandled Promise rejection`);
    server.close(()=>{
        process.exit(1)
    })
})