const Filter = require('../models/Filter')
const Option = require('../models/Option')

exports.getFilters = (req, res) => {

    let query = Filter.query().withGraphFetched('options')
        .where('type', 0)

    if (req.query.categoryId) {
        query = query.joinRelated('categories')
            .where('category_id', req.query.categoryId)
    }

    query.then(result => res.json(result))

}

exports.getOptions = (req, res) => {

    Filter.relatedQuery('options')
        .for(req.params.filterId)
        .then(result => res.json(result))

}