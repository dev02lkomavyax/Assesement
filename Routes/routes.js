const express = require('express')
const { signup, Login,updateuser,assignProjects,updateAuthorisation,deleteUser, resetPassword,createClient } = require('../Controllers/userController');
const { createProject,deleteProject,updateProjects, updateProjectAccess } = require('../Controllers/projectController');
const {clientLogin, assignProjectToClient, getClientProjects}=require('../Controllers/clientController')
const checkPermissions= require('../Middlewares/screenAuth')
const {projectScreenAuth,financeScreenAuth}=require("../Middlewares/projectScreenAuth")
const adminAuth= require("../Utils/adminAuth")
const auth= require('../Middlewares/auth')
const router= express.Router()

//for employee signup and login and so on
router.post('/signup',signup)
router.post('/login',Login)
router.post('/updateUser',updateuser)
router.post('/admin/updateAccess',adminAuth,updateAuthorisation)
router.put('/admin/removeuser',adminAuth,deleteUser)
router.post('/admin/reset-password',adminAuth,resetPassword)
router.post('/admin/client/assign-projects',adminAuth,assignProjectToClient)

//for the client 
router.post("/admin/clientSignup",adminAuth,createClient)
router.post('/clientLogin',clientLogin)
router.get('/client/get-projects',getClientProjects)



// for projects

router.post('/admin/project/assign-project',projectScreenAuth,assignProjects)
router.post('/admin/project/create',projectScreenAuth,createProject)
router.put('/admin/project/delete',projectScreenAuth,deleteProject)
router.post('/admin/project/update',projectScreenAuth,updateProjects)
router.post("/admin/projects/update-project-access",projectScreenAuth,updateProjectAccess)


module.exports = router;