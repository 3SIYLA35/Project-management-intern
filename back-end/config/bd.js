const mongoose=require('mongoose');
mongoose.set('strictQuery',false);
require('dotenv').config();

exports.Connect=async()=>{
    try{
        console.log(process.env.MONGODB_URL);
       const conn=await mongoose.connect( process.env.MONGODB_URL);
       console.log(`database connected :${conn.connection.host} `)
    }catch(error){
        console.error(error.message);
        process.exit(1);
    }
}