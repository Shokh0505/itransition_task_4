const jwt = require('jsonwebtoken');
const db = require('../db');

const checkAuthentication = async (req, res, next) => {
    const jwtTokenHeader = req.cookies.token("Authorization");
    if (!jwtTokenHeader || !jwtTokenHeader.includes("Bearer")) {
        return res.status(401).json({message: "Authorization is not present. Please, log in."});
    } 

    try {
        const jwtToken = jwtTokenHeader.split(" ")[1];
        const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
        req.user = decoded;

        const user_status = await db.oneOrNone(`
            SELECT status FROM users WHERE email = $1
        `, [req.user.email]);

        if (user_status === 'blocked') {
            return res.status(401).json({message: "You don't have access permission because you have been blocked"})
        }
        next()
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                message: "Invalid token. Please, log in again"
            })
        }
        next(error)
    }
}

module.exports = checkAuthentication;
