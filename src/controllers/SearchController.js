const Product = require('../models/Product')
const Category = require('../models/Category')
const Filter = require('../models/Filter')
const Option = require('../models/Option')
const { raw } = require('objection');

// exports.getCategories = async (req, res) => {
//     Product.relatedQuery('category').for(
//         Product.query()
//             .where(raw('lower("name")'), 'like', `%${req.query.q ? req.query.q.toLowerCase() : ''}%`)
//     )
//         .distinct()
//         .then(result => res.json(result))
// }

exports.getFilters = async (req, res) => {

    const categories = (await Category.query()
        .withGraphJoined('childrens'))
            .filter(e => e.childrens.length === 0)

    const allFilters = await Filter.query()
        .withGraphJoined('categories')
        .orderBy('id')

    const filters = allFilters.filter(e => e.categories.length === parseInt(categories.length))

    for (let filter of filters) {
        switch (filter.type) {
            case 0:
                const options = await Filter.relatedQuery('options')
                    .for(filter)
                    .orderBy('value')
                let exist = []
                for (let option of options) {
                    option.products_quantity = (await Option.relatedQuery('products')
                        .for(option)
                        .where(raw('lower("name")'), 'like', `%${req.query.q ? req.query.q.toLowerCase() : ''}%`)
                        .count()
                        .first())['count']
                    if (option.products_quantity != 0)
                        exist.push(option)
                }
                filter.options = exist
                break
            case 1:
                const { min, max } = await Product.query()
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

                    let query = Option.relatedQuery('products')
                        .for(option.id)
                        .where(raw('lower("name")'), 'like', `%${req.query.q ? req.query.q.toLowerCase() : ''}%`)

                    for (let next of filters) {
                        if (next === filter) continue

                        const queryParams = req.query[next.name]
                        if (!queryParams) continue

                        switch(next.type) {
                            case 0:
                                const values = queryParams.split(',').map(e => parseInt(e))
                                query = query.whereExists(
                                    Product.relatedQuery('options')
                                        .whereIn('id', values)
                                )
                                break
                            case 1:
                                const rangeValues = queryParams.split('-').map(e => parseInt(e))
                                query = query.whereBetween(next.name, rangeValues)
                                break
                            default:
                                break
                        }
                    }

                    option.products_quantity = (await query.count()
                        .first())['count']
                }
                break
            case 1:
                let query = Product.query()
                    .where(raw('lower("name")'), 'like', `%${req.query.q ? req.query.q.toLowerCase() : ''}%`)

                for (let next of filters) {
                    if (next === filter) continue

                    const queryParams = req.query[next.name]
                    if (!queryParams) continue

                    switch(next.type) {
                        case 0:
                            const values = queryParams.split(',').map(e => parseInt(e))
                            query = query = query.whereExists(
                                Product.relatedQuery('options')
                                    .whereIn('id', values)
                            )
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

    const filters = await Filter.query()
        .orderBy('id')

    let query = Product.query()
        .page(req.query.page ?? 0, 6)
        .orderBy(orderBy, order)
        .withGraphFetched('images')
        .where(raw('lower("product"."name")'), 'like', `%${req.query.q ? req.query.q.toLowerCase() : ''}%`)

    for (let filter of filters) {
        const queryParams = req.query[filter.name]

        if (!queryParams) continue

        switch (filter.type) {
            case 0:
                const values = queryParams.split(',').map(e => parseInt(e))
                query = query.whereExists(
                    Product.relatedQuery('options')
                        .whereIn('id', values)
                )
                break
            case 1:
                const rangeValues = queryParams.split('-').map(e => parseInt(e))
                query = query.whereBetween(filter.name, rangeValues)
                break
            default:
                break
        }
    }

    query.then(result => res.json(result))
}
