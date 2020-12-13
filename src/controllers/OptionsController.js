const Filter = require('../models/Filter')
const Option = require('../models/Option')

exports.getOptions = (req, res) => {
    Option.query()
        .withGraphFetched('filter(withCategories)')
        .modifiers({
            withCategories(builder) {
                builder.withGraphFetched('categories');
            }
        })
        .orderBy('value')
        .then(result => res.json(result))
}

exports.create = (req, res) => {
    Option.query()
        .insertAndFetch({
            value: req.body.value,
            filter_id: req.body.filter
        })
        .then(result => res.json(result))
}

exports.getOption = (req, res) => {
    Option.query()
        .findOne('id', req.params.optionId)
        .withGraphFetched('filter')
        .then(result => res.json(result))
}

exports.update = (req, res) => {
    Option.query()
        .patchAndFetchById(req.params.optionId, {
            value: req.body.value,
            filter_id: req.body.filter
        })
        .then(result => res.json(result))
}

exports.delete = (req, res) => {
    Option.query()
        .deleteById(req.params.optionId)
        .then(result => res.json(result))
}
