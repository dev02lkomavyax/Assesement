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
        unique:true,
    },
    designation:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true,
        default:"employee"
    },
    permissions:{
         projectScreen:{
              type:String,
              required:true,
              enum:["read","write","none"],
              default:"read"
         },
         employeeScreen:{
            type:String,
            required:true,
            enum:["read","write","none"],
            default:"read"
         },
         financeScreen:{
            type:String,
            required:true,
            enum:["read","write","none"],
            default:"none"
         },
         clientScreen:{
            type:String,
            required:true,
            enum:["read","write","none"],
            default:"none"
         },
         ticketScreen:{
            type:String,
            required:true,
            enum:["read","write","none"],
            default:"none"
         }
    },
    // access: {
    //     read: {
    //         type: Boolean,
    //         default: true, // Default access for read is true
    //     },
    //     write: {
    //         type: Boolean,
    //         default: false, // Default access for write is true
    //     },
    //     all:{
    //         type:Boolean,
    //         default:false,
    //     }
    // },
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