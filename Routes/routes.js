const express = require('express')
const { signup, Login,updateuser,assignProjects,updateAuthorisation,deleteUser } = require('../Controllers/userController');
const { createProject,deleteProject,updateProjects } = require('../Controllers/projectController');
const router= express.Router()


router.post('/signup',signup)
router.post('/login',Login)
router.post('/updateUser',updateuser)
router.post('/admin/assign-project',assignProjects)
router.post('/admin/updateAccess',updateAuthorisation)
router.put('/admin/removeuser',deleteUser)
router.post('/admin/create',createProject)
router.put('/admin/delete',deleteProject)
router.post('/admin/update',updateProjects)


module.exports = router;