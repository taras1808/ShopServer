const { Model } = require('objection');

class Product extends Model {
	static get tableName() {
		return 'product';
	}

	static get relationMappings() {
		const Category = require('./Category')
		return {
			category: {
				relation: Model.BelongsToOneRelation,
				modelClass: Category,
				join: {
					from: 'product.category_id',
					to: 'category.id'
				}
			}
		}
	}
}

module.exports = Product