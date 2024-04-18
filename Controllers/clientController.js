const Client = require("../Models/clientModel")
const jwt= require('jsonwebtoken')
const bcrypt=require('bcryptjs');
const assignedProjectModel = require("../Models/assignedProjects");
const Project = require("../Models/projectSchema");
// For comparing the password while login
const comparePass= async(password,dbPassword)=>{
    return await bcrypt.compare(password,dbPassword);
    
}
const Secret_key= "12346579"

// module.exports.clientLogin= async(req,res)=>{

//     console.log(req.body)
//     const{phone,password}=req.body
//     try {
//        const matchedClient= await Client.find({phone})
//        if(!matchedClient){
//         return res.status(404).json({
//             message:'Client not found',
//             status:'false'
//         })
//        }
//        const isValid=await comparePass(password,matchedClient.password)
//        if(!isValid){
//         return res.status(401).json({
//             message:"Password is incorrect",
//             status:'False'
//     })
//        }
//        const token= jwt.sign({ phone: phone, clientID: matchedClient._id }, Secret_key, { expiresIn: "1d" });
//        res.cookie('token', token, { httpOnly: true });
//                     res.cookie('clientId', matchedClient._id, { httpOnly: true });
//                     return res.status(201).json({ success: 'Login successful' });
//     } catch (error) {
//         return res.status(501).json({
//             message:"Internal Server Error",
//             status:"false",
//         })
//     }
// }
module.exports.clientLogin = async (req, res) => {
    console.log(req.body);
    const { phone, password } = req.body;

    try {
        const matchedClient = await Client.findOne({ phone });
        if (!matchedClient) {
            return res.status(404).json({
                message: 'Client not found',
                status: false
            });
        }

        const isValid = await comparePass(password, matchedClient.password);
        if (!isValid) {
            return res.status(401).json({ message: "Password is incorrect" });
        }

        const token = jwt.sign({ phone: phone, userId: matchedClient._id }, Secret_key, { expiresIn: "1d" });
        res.cookie('token', token, { httpOnly: true });
        res.cookie('clientId', matchedClient._id, { httpOnly: true });
        return res.status(201).json({ success: 'Login successful' });
    } catch (error) {
        console.error(error);
        return res.status(501).json({
            message: "Internal Server Error",
            status: false,
        });
    }
};

module.exports.assignProjectToClient=async(req,res)=>{
           console.log(req.body)
           const{projectId,clientId}=req.body
    try {
        const assignedProject= await Project.findOneAndUpdate({ projectId},
            {clientId:clientId}).populate({
            path:'clientId',
            model:'Client'
        })
        return res.status(200).json({
            message: "Project successfuly assigned to clients",
            status: true,
            assignedProject:assignedProject,
        });
        
    } catch (error) {
        return res.status(501).json({
            message:"Internal Server Error",
            status:false,
        })
    }
}
module.exports.getClientProjects=async(req,res)=>{
    const {clientId,projectId}=req.body;
    console.log(req.body)
    try {
        const matchedClient= await Project.find({projectId,clientId})
        if(!matchedClient){
            return res.status(401).json({
                message:'No project or client found',
                status:'false'
            })
        }
        else{
            return res.status(201).json({
                message:"project successfuly found",
                projects:matchedClient
            })
        }
    } catch (error) {
        return res.status(501).json({
            message:'Internal server error',
            status:'false'
        })
    }
}