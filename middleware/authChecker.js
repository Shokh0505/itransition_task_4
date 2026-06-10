const jwt = require('jsonwebtoken');

const checkAuthentication = (req, res, next) => {
    const jwtTokenHeader = req.get("Authorization");
    if (!jwtTokenHeader || !jwtTokenHeader.includes("Bearer")) {
        return res.status(401).json({message: "Invalid credentials or session expires. Please, login again"});
    } 

    try {
        const jwtToken = jwtTokenHeader.split(" ")[1];
        const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
        req.user = decoded;
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = checkAuthentication;
