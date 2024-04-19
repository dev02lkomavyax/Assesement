const express = require('express');
const app= require('../server.js')
const admin_route = require('../Routes/adminRoutes.js');
const client_route = require('../Routes/clientRoutes.js');
const employee_route = require('../Routes/employeeRoutes.js');

// Routes
app.use('/admin/projects', admin_route);
app.use('/admin', admin_route);
app.use('/client', client_route);
app.use('/employee', employee_route);


module.exports = app;
