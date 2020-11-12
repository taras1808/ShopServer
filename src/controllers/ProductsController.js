const Product = require('../models/Product')

exports.getProducts = (req, res) => {

    Product.query()
        .then(result => res.json(result))

}

exports.create = (req, res) => {

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).end();
    }

    var file = req.files.file

    if (!file) return res.status(400).end();

    file.mv('public/' + file.name, function(err) {
        if (err) return res.status(500).json(err)
        var path = 'http://' + req.hostname + ':' + req.socket.localPort + '/' + file.name

        Product.query()
            .insertAndFetch({
                name: req.body.name,
                price: req.body.price,
                image: path,
                category_id: req.body.category,
                producer_id: req.body.producer
            })
            .then(result => res.json(result))
    })
}

exports.getProduct = (req, res) => {

    Product.query()
        .findOne("id", req.params.productId)
        .then(result => res.json(result))

}
