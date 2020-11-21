const Product = require('../models/Product')
const Category = require('../models/Category')
const Knex = require('../models/Knex');
const { raw } = require('objection');


exports.getProducts = (req, res) => {

    Product.query()
        .then(result => res.json(result))

}

exports.getOptions = (req, res) => {

    Product.relatedQuery('options')
        .for(req.params.productId)
        .then(result => res.json(result))

}

exports.create = async (req, res) => {

    if (!req.body) {
        return res.status(400).end()
    }

    if (!req.body.name || req.body.name.length === 0) {
        return res.status(400).end()
    }

    const exists = await Product.query()
        .where(raw('lower("name")'), req.body.name.toLowerCase())

    if (exists.length > 0) {
        return res.status(409).end()
    }

    const product = await Product.query()
        .insertAndFetch({
            name: req.body.name,
            price: req.body.price,
            old_price: req.body.old_price,
            category_id: req.body.category_id
        })

    JSON.parse(req.body.options).forEach(async e => {
        const [id, value] = e
        await Knex.raw(`INSERT INTO filter_product_option VALUES(${id}, ${product.id}, ${value})`);
    });

    const file = req.files ? req.files.image : null

    if (file) {
        file.mv('public/' + file.name, function(err) {
            if (err) return res.status(500).json(err)
            var path = 'http://' + req.hostname + ':' + req.socket.localPort + '/' + file.name
            
            Product.query()
                .patchAndFetchById(product.id, {
                    image: path
                })
                .then(result => res.json(result))
        })
    } else {
        res.json(product)
    }
}

exports.getProduct = async (req, res) => {

    const product = await Product.query()
        .withGraphFetched('category')
        .findOne('id', req.params.productId)

    res.json(product)
}

exports.update = async (req, res) => {

    if (!req.body) {
        return res.status(400).end()
    }

    if (!req.body.name || req.body.name.length === 0) {
        return res.status(400).end()
    }

    const exists = await Product.query()
        .where(raw('lower("name")'), req.body.name.toLowerCase())
        .whereNot('id', req.params.productId)

    if (exists.length > 0) {
        return res.status(409).end()
    }

    const product = await Product.query()
        .patchAndFetchById(req.params.productId, {
            name: req.body.name,
            price: req.body.price,
            old_price: req.body.old_price,
            image: req.body.image ?? null,
            category_id: req.body.category_id
        })

    await Product.relatedQuery('options').for(product).unrelate()

    JSON.parse(req.body.options).forEach(async e => {
        const [id, value] = e
        const knex = Product.knex();
        await knex.raw(`INSERT INTO filter_product_option VALUES(${id}, ${product.id}, ${value})`);
    });

    const file = req.files ? req.files.file : null

    if (file) {
        file.mv('public/' + file.name, function(err) {
            if (err) return res.status(500).json(err)
            var path = 'http://' + req.hostname + ':' + req.socket.localPort + '/' + file.name
            
            Product.query()
                .patchAndFetchById(product.id, {
                    image: path
                })
                .then(result => res.json(result))
        })
    } else {
        res.json(product)
    }
}

exports.delete =  (req, res) => {
    Product.query()
        .deleteById(req.params.productId)
        .then(result => res.json(result))
}
