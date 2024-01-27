const jwt = require("jsonwebtoken");

const authGuard = (req, res, next) => {
    const { authorization } = req.headers;
    try {
        const token = authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // ### deprecated ###
        // const { payload } = decoded;
        const { userEmail, userRole } = decoded;
        req.userEmail = userEmail;
        req.userRole = userRole;
        next();
    } catch(err) {
        next("Authentication Failure!");
    } 
};

module.exports = authGuard;