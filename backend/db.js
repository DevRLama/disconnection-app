const mongoose=require('mongoose');
const mongoURI="mongodb://127.0.0.1:27017/disconnection";

const connectToMongo = () =>{
    mongoose.connect(mongoURI,()=>{
        console.log("Connected to Mongoose Succesfully")
    })
}

 module.exports=connectToMongo;

