const { Model } = require('objection');

class Option extends Model {
	static get tableName() {
		return 'option';
	}

	static get idColumn() {
		return 'id';
    }

	static get relationMappings() {
		const Filter = require('./Filter')
		const Product = require('./Product')
		return {
			filter: {
				relation: Model.BelongsToOneRelation,
				modelClass: Filter,
				join: {
					from: 'option.filter_id',
					to: 'filter.id'
				}
			},
			products: {
				relation: Model.ManyToManyRelation,
				modelClass: Product,
				join: {
					from: 'option.id',
					through: {
						from: 'filter_product_option.option_id',
						to: 'filter_product_option.product_id'
					},
					to: 'product.id'
				}
			},
		}
	}
}

module.exports = Option
