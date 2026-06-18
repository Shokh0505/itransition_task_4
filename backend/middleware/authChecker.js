const jwt = require('jsonwebtoken');
const db = require('../db');

const checkAuthentication = async (req, res, next) => {
    const token = req.cookies.token; 
    if (!token) {
        return res.status(401).json({message: "Authorization is not present. Please, log in."});
    } 

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        const user_status = await db.oneOrNone(`
            SELECT status FROM users WHERE email = $1
        `, [req.user.email]);

        if (!user_status) {
            return res.status(401).json({message: "User not found"})
        }
        if (user_status.status === 'blocked') {
            return res.status(403).json({message: "You don't have access permission because you have been blocked"})
        }
        next()
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                message: "Invalid token. Please, log in again"
            })
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                message: "Token expired please log in again"
            })
        }

        next(error)
    }
}

module.exports = checkAuthentication;
