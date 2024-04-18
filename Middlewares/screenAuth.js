const checkPermissions = (req, res, next) => {
    // Logging cookies for debugging
    // console.log(req.cookies, "this is cookies");
    //  console.log(req.cookies.permissions)
    const permissions = req.cookies.permissions;
    const role = req.cookies.role;

    // Check if the user has the required permission for the requested route
    if (req.path === '/admin/project/create' && (!permissions || permissions.projectScreen !== 'read')) {
        return res.status(403).json({ message: 'Forbidden: Access Denied' });
    } else if (req.path === '/admin/employees' && (!permissions || permissions.employeeScreen !== 'read')) {
        return res.status(403).json({ message: 'Forbidden: Access Denied' });
    } else if (req.path === '/admin' && role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden: Access Denied' });
    } else {
        next();
    }
};

module.exports = checkPermissions;
