const checkPermissions = (req, res, next) => {
    // const permissions = req.body.permissions;
    // const role= req.body.role


    // Check if the user has the required permission for the requested route
    if (req.path === '/admin/projects' && req.body.permissions.projectScreen !== 'read') {
        return res.status(403).json({ message: 'Forbidden: Access Denied' });
    }
     else if (req.path === '/admin/employees' && req.body.permissions.employeeScreen !== 'read') {
        return res.status(403).json({ message: 'Forbidden: Access Denied' });
    }
    else if(req.path==='/admin' && req.body.role !=='admin'){
        return res.status(403).json({message:"Forbidden: Access Denied"});
    }
    else{

        next();
    }
    // if (req.body.role === 'admin') {
    //     // User is an admin, proceed to the next middleware or route handler
    //     next();
    // } else {
    //     // User is not an admin, return a forbidden error
    //     return res.status(403).json({ message: 'Forbidden: Access Denied' });
    // }


};
module.exports = checkPermissions