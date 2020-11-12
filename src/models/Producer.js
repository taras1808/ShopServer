const { Model } = require('objection');

class Producer extends Model {
	static get tableName() {
		return 'producer';
	}

	static get relationMappings() {
		const Category = require('./Category')
		const Product = require('./Product')
		return {
			categories: {
				relation: Model.HasOneThroughRelation,
				modelClass: Category,
				join: {
					from: 'producer.id',
					through: {
						from: 'producer_category.producer_id',
						to: 'producer_category.category_id'
					},
					to: 'category.id'
				}
			},
			products: {
				relation: Model.HasManyRelation,
				modelClass: Product,
				join: {
					from: 'producer.id',
					to: 'product.producer_id'
				}
			}
		}
	}
}

module.exports = Producer