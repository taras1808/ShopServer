const Product = require('../models/Product')
const Category = require('../models/Category')

exports.getProducts = (req, res) => {

    Product.query()
        .then(result => res.json(result))

}

exports.getOptions = (req, res) => {

    Product.relatedQuery('options')
        .for(req.params.productId)
        .then(result => res.json(result))

}

exports.create = (req, res) => {

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).end();
    }

    var file = req.files.file

    if (!file) return res.status(400).end();

    file.mv('public/' + file.name, async function(err) {
        if (err) return res.status(500).json(err)
        var path = 'http://' + req.hostname + ':' + req.socket.localPort + '/' + file.name

        const product = await Product.query()
            .insertAndFetch({
                name: req.body.name,
                price: req.body.price,
                old_price: req.body.old_price.length === 0 ? null : req.body.old_price,
                image: path,
                category_id: req.body.category
            })

        JSON.parse(req.body.options).forEach(async e => {
            const [id, value] = e
            const knex = Product.knex();
            await knex.raw(`INSERT INTO filter_product_option VALUES(${id}, ${product.id}, ${value})`);
        });

        res.json(product)
    })
}

exports.getProduct = async (req, res) => {

    const product = await Product.query()
        .withGraphFetched('category')
        .findOne('id', req.params.productId)

    res.json(product)
}

exports.update =  async (req, res) => {

    const product = await Product.query()
        .patchAndFetchById(req.params.productId, {
            name: req.body.name,
            price: req.body.price,
            old_price: req.body.old_price,
            // image: path,
            category_id: req.body.category_id
        })

    await Product.relatedQuery('options').for(product).unrelate()

    req.body.options.forEach(async e => {
        const [id, value] = e
        const knex = Product.knex();
        await knex.raw(`INSERT INTO filter_product_option VALUES(${id}, ${product.id}, ${value})`);
    });

    res.json(product)
}

exports.delete =  (req, res) => {

    Product.query()
        .deleteById(req.params.productId)
        .then(result => res.json(result))

}
