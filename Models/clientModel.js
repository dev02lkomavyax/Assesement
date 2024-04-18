const mongoose= require("mongoose")

const clientSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        
    },
})

const Client= mongoose.model("Client",clientSchema);
module.exports= Client
