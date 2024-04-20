const express = require('express');

// internal imports
const app= require('../server.js')
const adminRoutes = require('../Routes/adminRoutes.js');
const clientRoutes = require('../Routes/clientRoutes.js');
const employeeRoutes = require('../Routes/employeeRoutes.js');
const globalErrorHandler=require('../Controllers/errorController.js')

// Routes
app.use('/admin/projects', adminRoutes);
app.use('/admin', adminRoutes);
app.use('/client', clientRoutes);
app.use('/employee', employeeRoutes);

// using error handler
app.use(globalErrorHandler)

module.exports = app;
