const { Model } = require('objection');

class Producent extends Model {
	static get tableName() {
		return 'producent';
	}

	static get relationMappings() {
		const Category = require('./Category')
		const Product = require('./Product')
		return {
			categories: {
				relation: Model.HasOneThroughRelation,
				modelClass: Category,
				join: {
					from: 'producent.id',
					through: {
						from: 'producent_category.producent_id',
						to: 'producent_category.category_id'
					},
					to: 'category.id'
				}
			},
			products: {
				relation: Model.HasManyRelation,
				modelClass: Product,
				join: {
					from: 'producent.id',
					to: 'product.producent_id'
				}
			}
		}
	}
}

module.exports = Producent