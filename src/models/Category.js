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
		const Filter = require('./Filter')
		return {
			products: {
				relation: Model.HasManyRelation,
				modelClass: Product,
				join: {
					from: 'category.id',
					to: 'product.category_id'
				}
			},
			filters: {
				relation: Model.HasOneThroughRelation,
				modelClass: Filter,
				join: {
					from: 'category.id',
					through: {
						from: 'filter_category.category_id',
						to: 'filter_category.filter_id'
					},
					to: 'filter.id'
				}
			},
		}
	}
}

module.exports = Category
