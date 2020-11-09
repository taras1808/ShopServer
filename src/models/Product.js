const { Model } = require('objection');

class Product extends Model {
	static get tableName() {
		return 'product';
	}

	static get relationMappings() {
		const Category = require('./Category')
		const Producent = require('./Producent')
		return {
			category: {
				relation: Model.BelongsToOneRelation,
				modelClass: Category,
				join: {
					from: 'product.category_id',
					to: 'category.id'
				}
			},
			producent: {
				relation: Model.BelongsToOneRelation,
				modelClass: Producent,
				join: {
					from: 'product.producent_id',
					to: 'producent.id'
				}
			}
		}
	}
}

module.exports = Product