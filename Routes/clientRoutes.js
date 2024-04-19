const {clientLogin, getClientProjects}=require('../Controllers/clientController')
const express= require('express')


const client_route= express.Router()

client_route.post('/clientLogin',clientLogin)
client_route.get('/client/get-projects',getClientProjects)

module.exports= client_route