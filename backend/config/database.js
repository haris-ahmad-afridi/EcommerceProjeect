const mongoose = require('mongoose');
const connectToDatabase=()=>{
    mongoose.connect(process.env.DB_URL)
.then((data)=>{
   console.log("connection successfull");
})

}
module.exports=connectToDatabase
