const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./Routes/routes.js');
const client_route= require('./Routes/clientRoutes.js')
const employee_route=require('./Routes/employeeRoutes.js')

const app = express();


app.use(bodyParser.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(
    cors({
      origin: "*", 
      credentials: true,
    })
);

// Routes
app.use('/admin', router); 
app.use('/client',client_route)
app.use('/employee',employee_route)
app.use('/', router); 

module.exports = app;

