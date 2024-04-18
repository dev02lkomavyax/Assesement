const Project= require('../Models/projectSchema')
const assignedProjectModel = require('../Models/assignedProjects')

module.exports.createProject = async (req, res) => {
    try {
        // console.log(req.body);
        const { name, description, startDate, deadline, clientName } = req.body;
        const newProject = new Project({
            name,
            description,
            startDate,
            deadline,
           
        });

        
        await newProject.save();

        return res.status(201).json({ message: 'Project Created Successfully', project: newProject });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

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
module.exports.updateProjectAccess = async (req, res) => {
    console.log(req.body);
    const { userId, projectId, accessType } = req.body;
    try {
        const project = await assignedProjectModel.findOneAndUpdate({ employeeId: userId, projectId: projectId });

        if (!project) {
            return res.status(401).json({
                message: "Project not found",
                success: false
            });
        } else {
            // Update permissions
           project.accessType=accessType;
            await project.save();

            return res.status(201).json({
                message: "Permissions updated successfully",
                success: true,
                project: project
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(501).json({
            message: "Something went wrong",
            success: false
        });
    }
};
