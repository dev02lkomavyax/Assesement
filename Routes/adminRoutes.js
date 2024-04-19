const express = require('express')
const { signup, Login,updateuser,assignProjects,updateAuthorisation,deleteUser, resetPassword,createClient } = require('../Controllers/userController');
const { createProject,deleteProject,updateProjects, updateProjectAccess } = require('../Controllers/projectController');
const { assignProjectToClient, getClientProjects}=require('../Controllers/clientController')
const {projectScreenAuth,financeScreenAuth}=require("../Middlewares/projectScreenAuth")
const adminAuth= require("../Utils/adminAuth")
const auth= require('../Middlewares/auth')
const admin_route= express.Router()

//for employee signup and login and so on
admin_route.post('/signup',signup)
admin_route.post('/login',Login)
admin_route.post('/updateUser',updateuser)
admin_route.post('/updateAccess',adminAuth,updateAuthorisation)
admin_route.put('/removeuser',adminAuth,deleteUser)
admin_route.post('/reset-password',adminAuth,resetPassword)
admin_route.post('/client/assign-projects',adminAuth,assignProjectToClient)
admin_route.post("/clientSignup",adminAuth,createClient)





// for projects

admin_route.post('/assign-project',projectScreenAuth,assignProjects)
admin_route.post('/create',projectScreenAuth,createProject)
admin_route.put('/delete',projectScreenAuth,deleteProject)
admin_route.post('/update',projectScreenAuth,updateProjects)
admin_route.post("/update-project-access",projectScreenAuth,updateProjectAccess)


module.exports = admin_route;