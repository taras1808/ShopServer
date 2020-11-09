const Product = require('../models/Product')

exports.get = (req, res) => {

    Product.query()
        .then(result => res.json(result))

}

exports.post = (req, res) => {

    // console.log(req.files)
    // console.log(req.body)
    res.end()

    // Product.query()
    //     .insertAndFetch({
    //         name: req.body.name,
    //         price: req.body.price,
    //         image: req.body.image,
    //         category_id: req.body.category
    //     })
    //     .then(result => res.json(result))

}

exports.getProduct = (req, res) => {

    Product.query()
        .findOne("id", req.params.productId)
        .then(result => res.json(result))

}
