const Product = require('../models/Product')
const Producer = require('../models/Producer')
const { raw } = require('objection');

exports.getCategories = async (req, res) => {
    Product.relatedQuery('category').for(
        Product.query()
            .where(raw('lower("name")'), 'like', `%${req.query.q.toLowerCase()}%`)
    )
        .distinct()
        .then(result => res.json(result))
}

exports.getProducers = async (req, res) => {

    Product.relatedQuery('producer').for(
        Product.query()
            .where(raw('lower("name")'), 'like', `%${req.query.q.toLowerCase()}%`)
    )
        .distinct()
        .then(result => res.json(result))

    // let producers = await Producer.query()

    // for (producer of producers) {
    //     producer.count = (await Product.query()
    //         .count()
    //         .where(raw('lower("name")'), 'like', `%${req.query.q.toLowerCase()}%`)
    //         .where('producer_id', producer.id))[0].count
    // }

    // res.json(producers.filter(e => e.count !== 0))
}

exports.getPrices = async (req, res) => {
    if (req.query.producers) {
        Product.query()
            .where(raw('lower("name")'), 'like', `%${req.query.q.toLowerCase()}%`)
            .whereIn('producer_id', req.query.producers.split(','))
            .max('price')
            .min('price')
            .then(result => res.json(result[0]))
    } else {
        Product.query()
            .where(raw('lower("name")'), 'like', `%${req.query.q.toLowerCase()}%`)
            .max('price')
            .min('price')
            .then(result => res.json(result[0]))
    }
}

exports.getProducts = async (req, res) => {

    let orderBy
    let order

    switch (req.query.orderBy) {
        case '0':
            orderBy = 'id'
            order = 'DESC'
            break
        case '1':
            orderBy = 'id'
            order = 'ASC'
            break
        case '2':
            orderBy = 'price'
            order = 'ASC'
            break
        case '3':
            orderBy = 'price'
            order = 'DESC'
            break
        case '4':
            orderBy = 'name'
            order = 'ASC'
            break
        case '5':
            orderBy = 'name'
            order = 'DESC'
            break
        default:
            orderBy = 'id'
            order = 'ASC'
            break
    }

    if (req.query.price) {
        if (req.query.producers) {
            Product.query()
                .where(raw('lower("name")'), 'like', `%${req.query.q.toLowerCase()}%`)
                .whereIn('producer_id', req.query.producers.split(','))
                .whereBetween('price', req.query.price.split('-'))
                .orderBy(orderBy, order)
                .then(result => res.json(result))
        } else {
            Product.query()
                .where(raw('lower("name")'), 'like', `%${req.query.q.toLowerCase()}%`)
                .whereBetween('price', req.query.price.split('-'))
                .orderBy(orderBy, order)
                .then(result => res.json(result))
        }
    } else {
        if (req.query.producers) {
            Product.query()
                .where(raw('lower("name")'), 'like', `%${req.query.q.toLowerCase()}%`)
                .whereIn('producer_id', req.query.producers.split(','))
                .orderBy(orderBy, order)
                .then(result => res.json(result))
        } else {
            Product.query()
                .where(raw('lower("name")'), 'like', `%${req.query.q.toLowerCase()}%`)
                .orderBy(orderBy, order)
                .then(result => res.json(result))
        }
    }
    
}
