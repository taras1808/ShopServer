const Product = require('../models/Product')
const Category = require('../models/Category')
const Option = require('../models/Option')
const Knex = require('../models/Knex');
const { raw } = require('objection');


exports.getProducts = (req, res) => {
    Product.query()
        .withGraphFetched('[category, images]')
        .where('category_id', req.query.categoryId ?? null)
        .orderBy('name')
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

    if (!req.body.name || req.body.name.length === 0 || req.body.price ===0) {
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
            category_id: req.body.category_id,
            info: req.body.info
        })

    JSON.parse(req.body.options).forEach(async e => {
        const [id, value] = e
        await Knex.raw(`INSERT INTO filter_product_option VALUES(${id}, ${product.id}, ${value})`);
    });

    if (req.files) {
        Object.values(req.files).forEach(e => e.mv('public/' + e.name, async (err) => {
            if (err) return res.status(500).json(err)
            var path = 'http://' + req.hostname + ':' + req.socket.localPort + '/' + e.name
            
            await Product.relatedQuery('images')
                .for(product)
                .insert({image: path})
        }))
    }

    res.json(product)
}

exports.getProduct = async (req, res) => {

    const product = await Product.query()
        .withGraphFetched('[category, images, options]')
        .findOne('product.id', req.params.productId)
    
    const fetchParent = async (category, parent) => {

        category.parent = await Category.query()
            .findOne('id', parent)

        if (category.parent && category.parent.parent_id)
            await fetchParent(category.parent, category.parent.parent_id)
    }

    await fetchParent(product.category, product.category.parent_id)

    product.options = Array.isArray(product.options) ? product.options : [product.options]

    for(let option of product.options) {
        const { title } = await Option.relatedQuery('filter')
            .for(option)
            .select('title')
            .first()
        option.name = title
    }

    product.items = await Product.query()
        .where('category_id', product.category_id)
        .withGraphFetched('images')
        .whereNot('id', product.id)

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
            old_price: req.body.old_price ?? null,
            category_id: req.body.category_id ?? null,
            info: req.body.info ?? null
        })

    await Product.relatedQuery('options').for(product).unrelate()
    await Product.relatedQuery('images').for(product).delete()

    if (req.body.images)
        JSON.parse(req.body.images).forEach(async (e) => {
            await Product.relatedQuery('images')
                .for(product)
                .insert({image: e.image})
        })

    JSON.parse(req.body.options).forEach(async (e) => {
        const [id, value] = e
        const knex = Product.knex();
        await knex.raw(`INSERT INTO filter_product_option VALUES(${id}, ${product.id}, ${value})`);
    });

    if (req.files) {
        for (let e of Object.values(req.files)) {
            await e.mv('public/' + e.name, (err) => {
                if (err) return res.status(500).json(err)
            })

            var path = 'http://' + req.hostname + ':' + req.socket.localPort + '/' + e.name
                
            await Product.relatedQuery('images')
                .for(product)
                .insert({image: path})
        }
    }

    Product.query()
        .withGraphFetched('[category, images]')
        .findOne('id', req.params.productId)
        .then(result => res.json(result))
}

exports.delete =  (req, res) => {
    Product.query()
        .deleteById(req.params.productId)
        .then(result => res.json(result))
}
