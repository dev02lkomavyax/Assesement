const jwt= require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const User = require('../Models/userSchema')
const Project=require('../Models/projectSchema')
const assignedProjectModel = require('../Models/assignedProjects')
const Secret_key= "12346579"
// For hashing the passwords
const hashPass= async(password)=>{
    return await bcrypt.hash(password,10)
}
// For comparing the password while login
const comparePass= async(password,dbPassword)=>{
    return await bcrypt.compare(password,dbPassword);
}
// For sending a mail using nodemailer
// const sendMail = async(email,otp)=>{
//     const transport = nodemailer.createTransport(
//         {
//             service:'Gmail',
//             auth:{
//                 user:"aditya22950@gmail.com",
//                 pass:"qwvuqjhbjteczaoi"
//             }
//         }
//     )
//     const mailOptions={
//         from:"aditya22950@gmail.com",
//         to:email,
//         subject:'Welcome to our place',
//         text:`Your otp for verification is ${otp}`
//     }
    
//     try {
//        const result= await transport.sendMail(mailOptions)
//        console.log('email sent successfully')
//        return true

//     } catch (error) {
//         // res.status(501).send('Something went wrong')
//         console.log('email send failed',error)
//         return false
//     }
// }

module.exports.signup= async(req,res)=>{
    console.log(req.body)
    console.log(req.cookies)
    const customUser= req.body;
    const newUser= new User(customUser)
    try {
        const {name,phone,password,designation,role}= req.body
        const user = await User.findOne({phone})
        if(user){
            return res.status(501).send('Phone number Already exists')
        }
        else if(name.length<3 ||password.length<6|| phone.length<10 ||designation.length<3 ||role.length<3){
           return res.status(501).send('please enter the correct details');

        }   
        else{
            // const otp = Math.floor(100000 + Math.random() * 900000);
            // const expiry = new Date();
            // expiry.setMinutes(expiry.getMinutes() + 5);
            // const verifiedMail= await sendMail(email,otp)
            
                const hashPassword=await hashPass(password)
                const newUser= new User({name,phone,designation,role,password:hashPassword})
                await newUser.save();
                res.status(201).send('And here we go Buddy!');   
        }
      
    } catch (error) {
        return res.status(501).send('an error occured')

    }
}

module.exports.Login=async(req,res)=>{
    console.log(req.body)
    const {phone,password}=req.body

    try {
       const user =await User.findOne({phone})
       if(!user){
           return res.status(501).send('User doesn"t exist');
       }
       else
      {
       if(!phone || phone.length<10){
           return res.status(501).send('Please enter your phone number');
       }
       else if(!password ||password.length<6){
           return res.status(501).send('password is incorrect');
       }
       else{
           const isValid= await comparePass(password,user.password)
           if(!isValid){
               return res.status(501).send('Your password is invalid');
           }
           else{
               const token= jwt.sign({phone:phone,userId:user._id},Secret_key,{expiresIn:"1d"})
              return res.status(201).send({success:'Login successful',token:token,userId:user._id})
           }
       }
      }
    } catch (error) {
       res.status(501).send('something went wrong');
       console.log(error)
    }
}
module.exports.updateuser = async (req, res) => {
    try {
        console.log(req.body);
        const { userId, name, password, phone, designation, role,status } = req.body;
        
        // Check if user exists
        const user = await User.findOne({ _id: userId });
        if (!user) {
            return res.status(400).json('User was not found');
        } else {
            // Update user fields
            await User.findOneAndUpdate(
                { _id: userId }, 
                { name, password, phone, designation, role,status }, 
                { new: true } // To return the updated document
            );
            return res.status(201).send('User details updated successfully');
        }
    } catch (error) {
        return res.status(501).send("Something went wrong");
    }
};
// module.exports.assignProjects = async (req, res) => {
//     console.log(req.body);
//     const { projectId, userId } = req.body;
//     try {
//         const user= await User.findById(userId);
//         if(!user){
//             return res.status(401).json('User not found')
//         }
//         const project = await Project.findById({ _id:projectId });
//         if (!project) {
//             return res.status(401).json('This project is no longer available');
//         }
//         const assignedProject = await assignedProjects.findOne({ _id: userId }).populate({
//             path: "project",
//             model: "Project"
//         });
//         return res.status(200).json(assignedProject);
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json("Internal Server Error");
//     }
// };


module.exports.assignProjects = async (req, res) => {
    console.log(req.body);
    const { projectId, userId, status } = req.body;
    try {
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json('Project not found');
        }

        // Iterate through each userId in the array
        const savedAssignedProjects = [];
        for (const id of userId) {
            const user = await User.findById(id);
            if (!user) {
                console.log(`User ${id} not found, skipping assignment`);
                continue;
            }

            // Create a new assignedProject document for each userId
            const assignedProject = new assignedProjectModel({
                projectId: projectId,
                employeeId: id,
                status: status || 'active'
            });

            // Save the assignedProject document
            const savedAssignedProject = await assignedProject.save();

            // Populate fields in the saved document
            await assignedProjectModel.populate(savedAssignedProject, { path: 'projectId', model: 'Project' });
            await assignedProjectModel.populate(savedAssignedProject, { path: 'employeeId', model: 'User' });

            savedAssignedProjects.push(savedAssignedProject);
        }

        return res.status(200).json(savedAssignedProjects);
    } catch (error) {
        console.error(error);
        return res.status(500).json("Internal Server Error");
    }
};





module.exports.updateAuthorisation = async (req, res) => {
    console.log(req.body);
    const { userId,permissions} = req.body;
    
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(401).json("User not found");
        }
        await User.findByIdAndUpdate(userId, {
            $set: { "permissions.projectScreen":permissions.projectScreen, "permissions.employeeScreen":permissions.employeeScreen ,}
        });
        return res.status(201).json("Access updated successfully");
    } catch (error) {
        console.error(error);
        return res.status(500).json("Internal server error");
    }
};
module.exports.deleteUser=async(req,res)=>{
    console.log(req.body)
    const {userId}=req.body;
    try {
        const user = await User.find({_id:userId})
        if(!user){
            return res.status(401).json("User doesn't exist")
        }
      await User.findByIdAndDelete({_id:userId})
      return res.status(201).json("user removed successfully")
        
    } catch (error) {
        return res.status(501).json("Internal Server Error");
    }
}


