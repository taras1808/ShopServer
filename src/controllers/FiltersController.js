const Filter = require('../models/Filter')
const Option = require('../models/Option')

exports.getFilters = (req, res) => {

    let query = Filter.query()
        .withGraphFetched('[options, categories]')
        .where('type', 0)

    if (req.query.categoryId) {
        query = query.joinRelated('categories')
            .where('category_id', req.query.categoryId)
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
        .for(req.params.filterId)
        .then(result => res.json(result))

}