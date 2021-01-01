const User = require('../models/User')
const jwt = require('jsonwebtoken')

exports.login = async (req, res) => {
    
    if (!req.body) {
		res.status(400).send({
			message: 'Content can not be empty!'
		})
		return
	}

	const creditentials = {
		email: req.body.email,
		password: req.body.password
	}
	
	const user = await User.query()
        .findOne({ email: creditentials.email, password: creditentials.password })
        .select('id', 'role')
    
	if (!user) {
		res.status(403).send({
			message: 'Forbidden'
		})
		return
    }
    
    const jwtToken = jwt.sign({ ...user }, 'yt6r5478rt87god938gf9h34f3', { expiresIn: '1H' })

    res.json({ ...user, token: jwtToken })
}

exports.getFavourite = async (req, res) => {
	User.relatedQuery('favourite')
		.for(req.params.userId)
		.page(req.query.page ?? 0, 6)
		.withGraphFetched('images')
		.then(result => res.json(result))
}

exports.addFavourite = async (req, res) => {
	User.relatedQuery('favourite')
		.for(req.params.userId)
		.relate(req.body.productId)
		.then(_ => res.json({}))
}

exports.removeFavourite = async (req, res) => {
	User.relatedQuery('favourite')
		.for(req.params.userId)
		.unrelate()
		.where('product_id', req.body.productId)
		.then(_ => res.json({}))
}
