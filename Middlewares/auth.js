const User = require('../Models/userSchema')

const Secret_key= "12346579"
module.exports.auth = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        const userId = req.cookies.userId;

        if (!token || !userId) {
            return res.status(401).json({
                message: "Token not found. Please login again.",
                status: false
            });
        }
        const decoded = await promisify(jwt.verify)(token, Secret_key);

        const currentUser = await User.findById(userId);
        if (!currentUser) {
            return res.status(401).json({
                message: "User doesn't exist.",
                status: false
            });
        }
        req.client = currentUser;
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error.",
            status: false
        });
    }
};
