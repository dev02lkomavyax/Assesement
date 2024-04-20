const express= require('express')

// internal imports
const clientController= require('../Controllers/clientController')
const {projectScreenAuth}= require('../Middlewares/projectScreenAuth')


const router= express.Router()

router.post('/clientLogin',clientController.clientLogin)
router.get('/get-projects',projectScreenAuth,clientController.getClientProjects)

module.exports= router