const express = require('express');
var jwt = require('jsonwebtoken');

const homeRoute = express.Router();

homeRoute.get("/", (req, res) => {
    try {
        const token = jwt.sign(
            { payload: 'Trusted User' }, 
            process.env.JWT_SECRET, 
            // { expiresIn: '1h' }
        );
        res.status(200).json({
            "access_token": token,
            "message": "JWT Bearer Token Genareted!"
        })
    } catch {
        res.status(401).json({
            "error": "Authetication Failed!"
        });
    }
});

module.exports = homeRoute;