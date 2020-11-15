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

    let producers = await Producer.query()
        .joinRelated('products')
        .groupBy('producer.id', 'producer.name')
        .where(raw('lower("products"."name")'), 'like', `%${req.query.q.toLowerCase()}%`)
        .select('producer.id', 'producer.name')
        .orderBy('producer.name')

    let query = Producer.relatedQuery('products')
        .where(raw('lower("name")'), 'like', `%${req.query.q.toLowerCase()}%`)
        .count()

    if (req.query.price) {
        query = query.whereBetween('price', req.query.price.split('-'))
    } 

    for (producer of producers) {

        const { count } = await query.for(producer).first()

        const { max, min } = await Producer.relatedQuery('products')
            .for(producer)
            .where(raw('lower("name")'), 'like', `%${req.query.q.toLowerCase()}%`)
            .max('price')
            .min('price')
            .first()

        producer.count = count
        producer.max = max
        producer.min = min
    }

    res.json(producers)
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
