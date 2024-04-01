const adminMiddleware = (req, res, next) => {
    // Assuming you have some way of identifying if a user is an admin, 
    // such as checking a role field in the user object
    if (req.user && req.user.role === 'admin') {
        // User is an admin, proceed to the next middleware or route handler
        next();
    } else {
        // User is not an admin, return a forbidden error
        return res.status(403).json({ message: 'Forbidden: Access Denied' });
    }
};

module.exports = adminMiddleware;