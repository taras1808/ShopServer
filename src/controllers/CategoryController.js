const Category = require('../models/Category')

exports.get = (req, res) => {

    Category.query()
        .then(result => res.json(result))

}

exports.getCategory = (req, res) => {

    Category.query()
        .findOne("id", req.params.categoryId)
        .then(result => res.json(result))

}

exports.getProducts = (req, res) => {

    Category.relatedQuery("products")
        .for(req.params.categoryId)
        .then(result => res.json(result))

}
