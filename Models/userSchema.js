const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    designation:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true,
    },
    access: {
        read: {
            type: Boolean,
            default: true, // Default access for read is true
        },
        write: {
            type: Boolean,
            default: false, // Default access for write is true
        },
        all:{
            type:Boolean,
            default:false,
        }
    },
    status:{
        type:String,
        required:true,
        default:'active'
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    }

})

const User = mongoose.model('User',userSchema);
module.exports= User