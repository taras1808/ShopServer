const Filter = require('../models/Filter')
const Option = require('../models/Option')

exports.getFilters = (req, res) => {

    let query = Filter.query()
        .withGraphFetched('[options(optionsOrderBy), categories(categoriesOrderBy)]')
        .modifiers({
            optionsOrderBy(builder) {
              builder.orderBy('value');
            },
            categoriesOrderBy(builder) {
                builder.orderBy('order');
            },
        })
        // .where('type', 0)

    if (req.query.categoryId) {
        query = query.joinRelated('categories')
            .where('category_id', req.query.categoryId)
            .orderBy('categories_join.order')
    }

    query.then(result => res.json(result))

}

exports.create = async (req, res) => {

    const filter = await Filter.query()
        .insertAndFetch({
            name: req.body.name,
            title: req.body.title,
            type: 0
        })

    await Filter.relatedQuery('categories')
        .for(filter)
        .relate(req.body.categories)

    res.json(filter)
}

exports.getFilter = (req, res) => {

    Filter.query()
        .findOne('id',req.params.filterId)
        .withGraphFetched('[categories]')
        // .where('type', 0)
        .then(result => res.json(result))

}

exports.update = async (req, res) => {

    const filter = await Filter.query()
        .patchAndFetchById(req.params.filterId, {
            name: req.body.name,
            title: req.body.title,
        })

    await Filter.relatedQuery('categories')
        .for(filter)
        .unrelate()

    await Filter.relatedQuery('categories')
        .for(filter)
        .relate(req.body.categories)

    res.json(filter)
}

exports.delete = (req, res) => {
    Filter.query()
        .deleteById(req.params.filterId)
        .then(result => res.json(result))
}

exports.getOptions = (req, res) => {

    Filter.relatedQuery('options')
        .orderBy('value')
        .for(req.params.filterId)
        .then(result => res.json(result))

}