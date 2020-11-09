const { Model } = require('objection');

class Category extends Model {
	static get tableName() {
		return 'category';
	}
	
	static get idColumn() {
		return 'id';
    }
      
    static get relationMappings() {
		const Product = require('./Product')
		const Producent = require('./Producent')
		return {
			products: {
				relation: Model.HasManyRelation,
				modelClass: Product,
				join: {
					from: 'category.id',
					to: 'product.category_id'
				}
			},
			producents: {
				relation: Model.HasOneThroughRelation,
				modelClass: Producent,
				join: {
					from: 'category.id',
					through: {
						from: 'producent_category.category_id',
						to: 'producent_category.producent_id'
					},
					to: 'producent.id'
				}
			},
		}
	}
}

module.exports = Category