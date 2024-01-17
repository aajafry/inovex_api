const jwt = require("jsonwebtoken");

const authGuard = (req, res, next) => {
    const { authorization } = req.headers;
    try {
        const token = authorization.split(' ')[1];
        const decoded = jwt.verify(
            token, 
            process.env.JWT_SECRET
        );
        const { payload } = decoded;
        next();
    } catch(err) {
        next("Authentication Failure!");
    } 
};

module.exports = authGuard;