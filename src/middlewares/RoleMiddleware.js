exports.onlyAdmins = (req, res, next) => {
    if (req.user &&  req.user.role == 'admin') {
        return next()
    } else {
        return res.status(403).send({
            message: 'Forbidden'
        })
    }
}