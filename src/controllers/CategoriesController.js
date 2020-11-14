const Category = require('../models/Category')
const Producer = require('../models/Producer')
const Product = require('../models/Product')

exports.getCategories = (req, res) => {

    Category.query()
        .then(result => res.json(result))

}

exports.getCategory = (req, res) => {

    Category.query()
        .findOne('id', req.params.categoryId)
        .then(result => res.json(result))

}

exports.getProducts = (req, res) => {

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
            Category.relatedQuery('products')
                .for(req.params.categoryId)
                .whereIn('producer_id', req.query.producers.split(','))
                .andWhereBetween('price', req.query.price.split('-'))
                .orderBy(orderBy, order)
                .then(result => res.json(result))
        } else {
            Category.relatedQuery('products')
                .for(req.params.categoryId)
                .andWhereBetween('price', req.query.price.split('-'))
                .orderBy(orderBy, order)
                .then(result => res.json(result))
        }
    } else {
        if (req.query.producers) {
            Category.relatedQuery('products')
                .for(req.params.categoryId)
                .whereIn('producer_id', req.query.producers.split(','))
                .orderBy(orderBy, order)
                .then(result => res.json(result))
        } else {
            Category.relatedQuery('products')
                .for(req.params.categoryId)
                .orderBy(orderBy, order)
                .then(result => res.json(result))
        }
    }

}

exports.getProducers = async (req, res) => {
    
    const producers = await Category.relatedQuery('producers')
        .for(req.params.categoryId)
        .orderBy('producer.name')

    let query = Producer.relatedQuery('products')
        .count()
        .max('price')
        .min('price')
        .first()

    if (req.query.price) {
        query = query.whereBetween('price', req.query.price.split('-'))
    }

    for(producer of producers) {
        const obj = await query.for(producer)

        producer.count = obj.count
        producer.max = obj.max ? obj.max : 0
        producer.min = obj.min ? obj.min : 0
    }

    res.json(producers)
}