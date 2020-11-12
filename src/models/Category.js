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
		const Producer = require('./Producer')
		return {
			products: {
				relation: Model.HasManyRelation,
				modelClass: Product,
				join: {
					from: 'category.id',
					to: 'product.category_id'
				}
			},
			producers: {
				relation: Model.HasOneThroughRelation,
				modelClass: Producer,
				join: {
					from: 'category.id',
					through: {
						from: 'producer_category.category_id',
						to: 'producer_category.producer_id'
					},
					to: 'producer.id'
				}
			},
		}
	}
}

module.exports = Category