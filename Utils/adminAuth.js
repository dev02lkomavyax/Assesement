const adminMiddleware = (req, res, next) => {
    
    if (req.body.role === 'admin') {
        // User is an admin, proceed to the next middleware or route handler
        next();
    } else {
        // User is not an admin, return a forbidden error
        return res.status(403).json({ message: 'Forbidden: Access Denied' });
    }
};

module.exports = adminMiddleware;