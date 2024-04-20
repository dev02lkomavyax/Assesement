const express= require('express')

// Internal imports
const userController= require('../Controllers/userController')

const router=express.Router()

router.post('/login',userController.Login)




module.exports=router;