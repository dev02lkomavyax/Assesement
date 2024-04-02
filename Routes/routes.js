const express = require('express')
const { signup, Login,updateuser,assignProjects,updateAuthorisation,deleteUser } = require('../Controllers/userController');
const { createProject,deleteProject,updateProjects } = require('../Controllers/projectController');
const checkPermissions= require('../Middlewares/screenAuth')
const {projectScreenAuth,financeScreenAuth}=require("../Middlewares/projectScreenAuth")
const adminAuth= require("../Utils/adminAuth")
const router= express.Router()


router.post('/signup',signup)
router.post('/login',Login)
router.post('/updateUser',updateuser)
router.post('/admin/updateAccess',adminAuth,updateAuthorisation)
router.put('/admin/removeuser',adminAuth,deleteUser)
// for projects
router.post('/admin/project/assign-project',projectScreenAuth,assignProjects)
router.post('/admin/project/create',projectScreenAuth,createProject)
router.put('/admin/project/delete',projectScreenAuth,deleteProject)
router.post('/admin/project/update',projectScreenAuth,updateProjects)


module.exports = router;