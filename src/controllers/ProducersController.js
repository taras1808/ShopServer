const Category = require('../models/Category')
const Producer = require('../models/Producer')

exports.get = (req, res) => {

    Producer.query()
        .then(result => res.json(result))

}

exports.create = async (req, res) => {

    const producer = await Producer.query()
        .insertAndFetch({
            name: req.body.name
        })

    req.body.categories.forEach(async categoryId => {
        await Producer.relatedQuery('categories')
            .for(producer)
            .relate(categoryId)
    })

    res.json(producer)
}

exports.getCategories = async (req, res) => {

    Producer.relatedQuery('categories')
        .for(req.params.producerId)
        .then(result => res.json(result))
}

exports.getProducer = async (req, res) => {

    const producer = await Producer.query()
        .findOne('id', req.params.producerId)

    producer.categories = await Producer.relatedQuery('categories')
        .for(req.params.producerId)

    res.json(producer)
}

exports.update = async (req, res) => {

    const producer = await Producer.query()
        .patchAndFetchById(req.params.producerId, {
            name: req.body.name
        })

    await Producer.relatedQuery('categories')
        .for(producer)
        .unrelate()

    req.body.categories.forEach(async categoryId => {
        await Producer.relatedQuery('categories')
            .for(producer)
            .relate(categoryId)
    })

    res.json(producer)
}

exports.delete = async (req, res) => {

    Producer.query()
        .deleteById(req.params.producerId)
        .then(result => res.json(result))
}
