const Product = require('../models/Product')

exports.get = (req, res) => {

    Product.query()
        .then(result => res.json(result))

}

exports.getProduct = (req, res) => {

    Product.query()
        .findOne("id", req.params.productId)
        .then(result => res.json(result))

}
