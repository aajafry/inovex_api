// callback error handler
const callbackGuard = (req, res, next) => {
    setImmediate(() => {
      next(new Error("Something went wrong"));
    });
}


module.exports = callbackGuard;