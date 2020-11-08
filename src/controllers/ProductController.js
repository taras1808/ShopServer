const Product = require('../models/Product')

exports.get = (req, res) => {

    Product.query()
        .then(result => res.json(result))

}
