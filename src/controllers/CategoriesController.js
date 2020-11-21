const Category = require('../models/Category')
const Product = require('../models/Product')
const Filter = require('../models/Filter')
const Option = require('../models/Option')

exports.getCategories = (req, res) => {

    Category.query()
        .then(result => res.json(result))

}

exports.getCategory = (req, res) => {

    Category.query()
        .findOne('id', req.params.categoryId)
        .then(result => res.json(result))

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
            order = 'DESC'
            break
    }

    const filters = await Category.relatedQuery('filters')
        .for(req.params.categoryId)
        .orderBy('id')

    let query = Product.query()
        .where('category_id', req.params.categoryId)
        .joinRelated('options', { alias: 'option' })
        .orderBy(orderBy, order)

    for (let filter of filters) {
        const queryParams = req.query[filter.name]
        if (!queryParams) continue

        switch (filter.type) {
            case 0:
                const values = queryParams.split(',').map(e => parseInt(e))
                query = query.whereIn('option.id', values)
                break
            case 1:
                const rangeValues = queryParams.split('-').map(e => parseInt(e))
                query = query.whereBetween(next.name, rangeValues)
                break
            default:
                break
        }
    }

    query.then(result => res.json(result))
}

exports.getFilters = async (req, res) => {

    const filters = await Category.relatedQuery('filters')
        .for(req.params.categoryId)
        .orderBy('id')

    for (let filter of filters) {
        switch (filter.type) {
            case 0:
                const options = await Filter.relatedQuery('options')
                    .for(filter)
                const exist = []
                for (let option of options) {
                    const { count } = await Option.relatedQuery('products')
                        .for(option)
                        .where('category_id', req.params.categoryId)
                        .count()
                        .first()
                    if (parseInt(count) !== 0) {
                        option.products_quantity = count
                        exist.push(option)
                    }
                }
                filter.options = exist
                break
            case 1:
                const { min, max } = await Category.relatedQuery('products')
                    .for(req.params.categoryId)
                    .min('price')
                    .max('price')
                    .first()
                filter.range = { min: parseFloat(min), max: parseFloat(max)}
                break
            default:
                break
        }
    }
    

    for (let filter of filters) {
        switch(filter.type) {
            case 0:
                for (let option of filter.options) {

                    let query =  Product.query().joinRelated('options', { alias: 'option' })
                        .where('option.id', option.id)
                        .where('category_id', req.params.categoryId)

                    for (next of filters) {
                        if (next === filter) continue

                        const queryParams = req.query[next.name]
                        if (!queryParams) continue

                        switch(next.type) {
                            case 0:
                                const values = queryParams.split(',').map(e => parseInt(e))
                                query = query.whereIn('option.id', values)
                                break
                            case 1:
                                const rangeValues = queryParams.split('-').map(e => parseInt(e))
                                query = query.whereBetween(next.name, rangeValues)
                                break
                            default:
                                break
                        }
                    }

                    const { count } = await query.count().first()
                    option.products_quantity = count
                }
                break
            case 1:
                let query = Product.query().joinRelated('options', { alias: 'option' })
                        .where('category_id', req.params.categoryId)

                for (let next of filters) {
                    if (next === filter) continue

                    const queryParams = req.query[next.name]
                    if (!queryParams) continue

                    switch(next.type) {
                        case 0:
                            const values = queryParams.split(',').map(e => parseInt(e))
                            query = query.whereIn('option.id', values)
                            break
                        case 1:
                            const rangeValues = queryParams.split('-').map(e => parseInt(e))
                            query = query.whereBetween(next.name, rangeValues)
                            break
                        default:
                            break
                    }
                }

                const { min, max } = await query.min('price').max('price').first()
                filter.range = { min: parseFloat(min), max: parseFloat(max)}
                break
            default:
                break
        }
    }
    res.json(filters)
}
