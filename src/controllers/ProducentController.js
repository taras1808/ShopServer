const Producent = require('../models/Producent')

exports.post = async (req, res) => {

    const producent = await Producent.query()
        .insertAndFetch({
            name: req.body.name
        })

        req.body.category.forEach(async categoryId => {
            await Producent.relatedQuery("categories")
                .for(producent)
                .relate(categoryId)
        })

    res.json(producent)
}
