module.exports.projectScreenAuth = (req, res, next) => {
    const permissions=req.cookies.permissions
    const role= req.cookies.role
    console.log(role)
    console.log(permissions)
    if(!permissions || !role){
        return res.status(403).json({message: 'Forbidden: You do not have the access for this page' })
    }
    else if (permissions.projectScreen==="none") {
        return res.status(403).json({ message: 'Forbidden: You do not have the access for this page' });
        
    } else {
        next();
    }
};

module.exports.financeScreenAuth=(req,res,next)=>{
    if(permissions.financeScreen==="none"){
        return res.status(403).json({ message: 'Forbidden: You do not have the access for Finance page' });
    }
}