const mongoose = require('mongoose');

const projectSchema= mongoose.Schema({
name:{
    type:String,
    required:true,
},
description:{
    type:String,
    required:true,
},
startDate:{
    type:String,
    required:true,
},
deadline:{
    type:String,
    required:true,
},
clientId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Client"
}
},
{
    timestamps: true,
    collection: 'projectSchema',
    strict: false
})
const Project= mongoose.model('Project',projectSchema)
module.exports= Project;