const {clientLogin, getClientProjects}=require('../Controllers/clientController')
const express= require('express')
const {projectScreenAuth}= require('../Middlewares/projectScreenAuth')


const client_route= express.Router()

client_route.post('/clientLogin',clientLogin)
client_route.get('/get-projects',projectScreenAuth,getClientProjects)

module.exports= client_route