const jwt = require('jsonwebtoken');

exports.optional = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (authHeader) {
        const token = authHeader.split(' ')[1]
        jwt.verify(token, "yt6r5478rt87god938gf9h34f3", (err, payload) => {
            if (err) {
                return next()
            }
            req.user = payload
            return next()
        });
        
    } else {
        return next()
    }
}

exports.required = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (authHeader) {
        const token = authHeader.split(' ')[1]
        jwt.verify(token, "yt6r5478rt87god938gf9h34f3", (err, payload) => {
            if (err) {
                return res.status(403).send({
                    message: 'Forbidden'
                })
            }
            req.user = payload
            next()
        })
    } else {
        return res.status(401).send({
			message: 'Unauthorized'
		})
    }
}
