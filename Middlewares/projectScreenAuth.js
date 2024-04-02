module.exports.projectScreenAuth = (req, res, next) => {
    
    if (req.body.permissions.projectScreen==="none") {
        // User is not an admin, return a forbidden error
        return res.status(403).json({ message: 'Forbidden: You do not have the access for this page' });
        
    } else {
        next();
    }
};

module.exports.financeScreenAuth=(req,res,next)=>{
    if(req.body.permissions.financeScreen==="none"){
        return res.status(403).json({ message: 'Forbidden: You do not have the access for Finance page' });
    }
}