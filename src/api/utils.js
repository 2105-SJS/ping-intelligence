function requireUser (req, res, next) {
    if (!req.auth) {
        next({
            name: "MissingUserError",
            message: "You must be logged in to perform this action"
        });
    }
    next();
}

module.exports = {
    requireUser
}