const express = require('express')

// internal imports
const userController=require('../Controllers/userController')
const projectController=require('../Controllers/projectController')
const clientController=require('../Controllers/clientController')
const {projectScreenAuth,financeScreenAuth}=require("../Middlewares/projectScreenAuth")
const adminAuth= require("../Utils/adminAuth")
const auth= require('../Middlewares/auth')

const router= express.Router()

//for employee signup and login and so on
router.post('/signup',userController.signup)
router.post('/login',userController.Login)
router.post('/update-user',userController.updateuser)
router.post('/update-access',adminAuth,userController.updateAuthorisation)
router.put('/remove-user',adminAuth,userController.deleteUser)
router.post('/reset-password',adminAuth,userController.resetPassword)
router.post('/assign-projects-clients',clientController.assignProjectToClient)
router.post("/client-signup",userController.createClient)





// for projects

router.post('/assign-project',projectScreenAuth,userController.assignProjects)
router.post('/create',projectScreenAuth,projectController.createProject)
router.put('/delete',projectScreenAuth,projectController.deleteProject)
router.post('/update',projectScreenAuth,projectController.updateProjects)
router.post("/update-project-access",projectScreenAuth,projectController.updateProjectAccess)


module.exports = router;