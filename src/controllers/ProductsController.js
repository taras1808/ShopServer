const Product = require('../models/Product')
const Category = require('../models/Category');
const Producer = require('../models/Producer')

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

exports.getProduct = async (req, res) => {

    const product = await Product.query()
        .findOne('id', req.params.productId)

    product.category = await Category.query()
        .findOne('id', product.category_id)

    product.producer = await Producer.query()
        .findOne('id', product.producer_id)

    delete product["category_id"]
    delete product["producer_id"]

    res.json(product)
}

exports.update =  (req, res) => {

    Product.query()
        .patchAndFetchById(req.params.productId, {
            name: req.body.name,
            price: req.body.price,
            // image: path,
            category_id: req.body.category_id,
            producer_id: req.body.producer_id
        })
        .then(result => res.json(result))

}

exports.delete =  (req, res) => {

    Product.query()
        .deleteById(req.params.productId)
        .then(e => {
            console.log(e)
            return e
        })
        .then(result => res.json(result))

}
