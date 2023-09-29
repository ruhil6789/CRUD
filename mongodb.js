const mongoose= require('mongoose')
mongoose.connect("mongodb://localhost:27017/CRUD",{useNewUrlParser:true},(err)=>{
    if(!err){
        console.log("connection established with mongodb")
    }else{
        console.log("failed to connect the mogodb with error",err)
    }
})
// connecting node and mongodb
require('./model/course')