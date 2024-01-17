// default error handler
const errorGuard = (err, req, res, next) => {
    if(res.HeadersSet) {
        return next(err)
    }
    res.status(500).json({error : err})
}

module.exports = errorGuard;