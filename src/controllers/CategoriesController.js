const Category = require('../models/Category')
const Product = require('../models/Product')
const Filter = require('../models/Filter')
const Option = require('../models/Option')

exports.getCategories = (req, res) => {
    Category.query()
        .then(result => res.json(result))
}

exports.getRootCategories = async (req, res) => {
    const categories = await Category.query()
        .whereNull('parent_id')

    for (let category of categories) {
        category.childrens = await Category.query()
            .where('parent_id', category.id)
    }

    res.json(categories)
}

exports.create = async (req, res) => {
    const category = await Category.query()
        .insertAndFetch({
            name: req.body.name,
            parent_id: req.body.parent
        })

    if (req.files && req.files.file) {
        const file = req.files.file
        file.mv('public/' + file.name, async (err) => {
            if (err) return res.status(500).json(err)
            var path = 'http://' + req.hostname + ':' + req.socket.localPort + '/' + file.name
            
            Category.query()
                .patchAndFetchById(category.id, {
                    image: path
                })
                .then(result => res.json(result))
        })
    } else {
        res.json(category)
    }
}

exports.getCategory = async (req, res) => {
    const category = await Category.query()
        .findOne('id', req.params.categoryId)

    category.childrens = await Category.query()
        .where('parent_id', category.id)

    for (let child of category.childrens) {
        child.childrens = await Category.query()
            .where('parent_id', child.id)
    }

    const fetchParent = async (category, parent) => {

        category.parent = await Category.query()
            .findOne('id', parent)

        if (category.parent && category.parent.parent_id)
            await fetchParent(category.parent, category.parent.parent_id)
    }

    await fetchParent(category, category.parent_id)

    res.json(category)
}

exports.update = async (req, res) => {
    const category = await Category.query()
        .patchAndFetchById(req.params.categoryId, {
            name: req.body.name,
            image: req.body.image ?? null,
            parent_id: req.body.parent ?? null
        })

    if (req.files && req.files.file) {
        const file = req.files.file
        file.mv('public/' + file.name, async (err) => {
            if (err) return res.status(500).json(err)
            var path = 'http://' + req.hostname + ':' + req.socket.localPort + '/' + file.name
            
            Category.query()
                .patchAndFetchById(category.id, {
                    image: path
                })
                .then(result => res.json(result))
        })
    } else {
        res.json(category)
    }
}

exports.delete = (req, res) => {
    Category.query()
        .deleteById(req.params.categoryId)
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
        .withGraphFetched('images')
        .where('category_id', req.params.categoryId)
        .orderBy(orderBy, order)

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

                    let query = Option.relatedQuery('products')
                        .for(option.id)
                        .where('category_id', req.params.categoryId)

                    for (next of filters) {
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

                    const { count } = await query.count().first()
                    option.products_quantity = count
                }
                break
            case 1:
                let query = Product.query()
                        .where('category_id', req.params.categoryId)

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

                const { min, max } = await query.min('price').max('price').first()
                filter.range = { min: parseFloat(min), max: parseFloat(max)}
                break
            default:
                break
        }
    }
    res.json(filters)
}
