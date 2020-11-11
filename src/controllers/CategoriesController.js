const Category = require('../models/Category')

exports.getCategories = (req, res) => {

    Category.query()
        .then(result => res.json(result))

}

exports.getCategory = (req, res) => {

    Category.query()
        .findOne('id', req.params.categoryId)
        .then(result => res.json(result))

}

exports.getPrices = (req, res) => {

    if (req.query.producers) {
        Category.relatedQuery('products')
            .for(req.params.categoryId)
            .whereIn('producer_id', req.query.producers.split(','))
            .max('price')
            .min('price')
            .then(result => res.json(result[0]))
    } else {
        Category.relatedQuery('products')
            .for(req.params.categoryId)
            .max('price')
            .min('price')
            .then(result => res.json(result[0]))
    }

}

exports.getProducts = (req, res) => {

    if (req.query.price && req.query.price != '') {
        if (req.query.producers && req.query.producers != '') {
            Category.relatedQuery('products')
                .for(req.params.categoryId)
                .whereIn('producer_id', req.query.producers.split(','))
                .andWhereBetween('price', req.query.price.split(','))
                .then(result => res.json(result))
        } else {
            Category.relatedQuery('products')
                .for(req.params.categoryId)
                .andWhereBetween('price', req.query.price.split(','))
                .then(result => res.json(result))
        }
    } else {
        if (req.query.producers && req.query.producers != '') {
            Category.relatedQuery('products')
                .for(req.params.categoryId)
                .whereIn('producer_id', req.query.producers.split(','))
                .then(result => res.json(result))
        } else {
            Category.relatedQuery('products')
                .for(req.params.categoryId)
                .then(result => res.json(result))
        }
    }

}

exports.getProducers = (req, res) => {

    Category.relatedQuery('producers')
        .for(req.params.categoryId)
        .then(result => res.json(result))

}