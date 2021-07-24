const User = require('../models/User')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
    if (!req.body) {
		return res.status(400).send({
			message: 'Content can not be empty!'
		})
	}

	const account = {
		email: req.body.email,
		password: req.body.password,
		first_name: req.body.firstName,
		last_name: req.body.lastName,
		role: 'user'
	}

	if (!account.email || account.email === '' ||
		!account.password || account.password === '' ||
		!account.first_name || account.first_name === '' ||
		!account.last_name || account.last_name === ''
	) {
		return res.status(400).send({
			message: 'Params can not be empty!'
		})
	}

	const user = await User.query()
        .findOne({ email: account.email })
    
	if (user) {
		return res.status(403).send({
			message: 'User already exists'
		})
    }
	
	User.query()
		.insertAndFetch(account)
		.then(result => res.json({}))
}

exports.authenticate = async (req, res) => {
    if (!req.body) {
		return res.status(400).send({
			message: 'Content can not be empty!'
		})
	}

	const creditentials = {
		email: req.body.email,
		password: req.body.password
	}
	
	const user = await User.query()
        .findOne({ email: creditentials.email, password: creditentials.password })
        .select('id', 'email', 'role', 'first_name', 'last_name')
    
	if (!user) {
		return res.status(403).send({
			message: 'Forbidden'
		})
    }
    
	const jwtToken = jwt.sign({ ...user }, 'yt6r5478rt87god938gf9h34f3', { expiresIn: '1H' })
	
    res.json({ ...user, token: jwtToken })
}

exports.getFavourite = async (req, res) => {
	let orderBy
    let order
    
    switch (req.query.orderBy) {
        case '0':
            orderBy = 'id'
            order = 'DESC'
            break
        case '1':
            orderBy = 'id'
            order = 'ASC'
            break
        case '2':
            orderBy = 'price'
            order = 'ASC'
            break
        case '3':
            orderBy = 'price'
            order = 'DESC'
            break
        case '4':
            orderBy = 'name'
            order = 'ASC'
            break
        case '5':
            orderBy = 'name'
            order = 'DESC'
            break
        default:
            orderBy = 'id'
            order = 'DESC'
            break
	}

	User.relatedQuery('favourite')
		.for(req.user.id)
		.page(req.query.page ?? 0, 8)
		.withGraphFetched('images')
		.orderBy(orderBy, order)
		.then(result => res.json(result), err => console.log(err))
}

exports.addFavourite = async (req, res) => {
	User.relatedQuery('favourite')
		.for(req.user.id)
		.relate(req.body.productId)
		.then(_ => res.json({}))
}

exports.removeFavourite = async (req, res) => {
	User.relatedQuery('favourite')
		.for(req.user.id)
		.unrelate()
		.where('product_id', req.body.productId)
		.then(_ => res.json({}))
}
