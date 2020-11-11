const Producer = require('../models/Producer')

exports.create = async (req, res) => {

    const producer = await Producer.query()
        .insertAndFetch({
            name: req.body.name
        })

        req.body.category.forEach(async categoryId => {
            await Producer.relatedQuery("categories")
                .for(producer)
                .relate(categoryId)
        })

    res.json(producer)
}
