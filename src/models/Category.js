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
		return {
			products: {
				relation: Model.HasManyRelation,
				modelClass: Product,
				join: {
					from: 'category.id',
					to: 'product.category_id'
				}
			}
		}
	}
}

module.exports = Category