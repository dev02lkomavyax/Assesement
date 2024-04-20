const Project= require('../Models/projectSchema')
const assignedProjectModel = require('../Models/assignedProjects');
const catchAsync = require('../Utils/catchAsync');

const createProject = catchAsync(async (req, res) => {
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
});

const deleteProject = catchAsync(async (req, res) => {
    console.log(req.body);
    const { projectId } = req.body;
        const project = await Project.findOne({ _id: projectId });
        if (!project) {
            return res.status(400).json('Project not found');
        }
        await Project.findOneAndDelete({ _id: projectId });
        return res.status(201).json('Project deleted successfully');
});

const updateProjects= catchAsync(async(req,res)=>{
 
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
});
const updateProjectAccess = catchAsync(async (req, res) => {
    console.log(req.body);
    const { userId, projectId, accessType } = req.body;
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
});
module.exports= {
    createProject,
    deleteProject,
    updateProjectAccess,
    updateProjects
}
