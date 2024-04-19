const express= require('express')
const {Login} = require('../Controllers/userController')

const employee_route=express.Router()

employee_route.post('/login',Login)

module.exports=employee_route;