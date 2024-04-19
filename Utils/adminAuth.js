const adminMiddleware = (req, res, next) => {
    
    if (req.body.role === 'admin') {    
        next();
    } else {
        return res.status(403).json({ message: 'Forbidden: Access Denied' });
    }
};

module.exports = adminMiddleware;