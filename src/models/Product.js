const { Model } = require('objection');

class Product extends Model {
	static get tableName() {
		return 'product';
	}

	static get relationMappings() {
		const Category = require('./Category')
		const Producer = require('./Producer')
		return {
			category: {
				relation: Model.BelongsToOneRelation,
				modelClass: Category,
				join: {
					from: 'product.category_id',
					to: 'category.id'
				}
			},
			producer: {
				relation: Model.BelongsToOneRelation,
				modelClass: Producer,
				join: {
					from: 'product.producer_id',
					to: 'producer.id'
				}
			}
		}
	}
}

module.exports = Product