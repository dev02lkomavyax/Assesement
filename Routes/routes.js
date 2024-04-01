const express = require('express')
const { signup, Login,updateuser,assignProjects,updateAuthorisation,deleteUser } = require('../Controllers/userController');
const { createProject,deleteProject,updateProjects } = require('../Controllers/projectController');
const adminMiddleware=require("../Utils/adminAuth")
const router= express.Router()


router.post('/signup',signup)
router.post('/login',Login)
router.post('/updateUser',updateuser)
router.post('/admin/assign-project',adminMiddleware,assignProjects)
router.post('/admin/updateAccess',adminMiddleware,updateAuthorisation)
router.put('/admin/removeuser',adminMiddleware,deleteUser)
router.post('/admin/create',adminMiddleware,createProject)
router.put('/admin/delete',adminMiddleware,deleteProject)
router.post('/admin/update',adminMiddleware,updateProjects)


module.exports = router;