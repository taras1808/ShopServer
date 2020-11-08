const Category = require('../models/Category')

exports.get = (req, res) => {

    Category.query()
        .then(result => res.json(result))

}

exports.getProducts = (req, res) => {

    Category.relatedQuery("products")
        .for(req.params.category)
        .then(result => res.json(result))

}
