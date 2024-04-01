const Project= require('../Models/projectSchema')

module.exports.createProject= async(req,res)=>{
    try {
        console.log(req.body)
        const {name,description,startDate,deadline,clientName}=req.body;
        const newprojectName = await Project.findOne({name});
        if(newprojectName){
            return res.status(400).send('Project already exists');
        }
        else{
            const newProject =new Project({
                name,
                description,
                startDate,
                deadline,
                clientName,
            })
            await newProject.save();
            return res.status(201).json('Project Created Successfully'); 
        }
    } catch (error) {
        return res.status(501).json('something went wrong')
    }
}
module.exports.deleteProject = async (req, res) => {
    console.log(req.body);
    const { projectId } = req.body;
    try {
        const project = await Project.findOne({ _id: projectId });
        if (!project) {
            return res.status(400).json('Project not found');
        }
        await Project.findOneAndDelete({ _id: projectId });
        return res.status(201).json('Project deleted successfully');
    } catch (error) {
        return res.status(501).json('Something went wrong');
    }
};

module.exports.updateProjects= async(req,res)=>{
 
    try {
        console.log(req.body)
        const{projectId,projectName,description,startDate,deadline,clientName}=req.body
        const project=await Project.findOne({_id:projectId})
        if(!project){
            return res.status(400).json('Project did not found')
        }
        else{
            await Project.findOneAndUpdate({_id:projectId,projectName,description,startDate,deadline,clientName})
            return res.status(201).send('Project updated successfuly')
        }
        
    } catch (error) {
        return res.status(501).send("something went wrong");
    }
}