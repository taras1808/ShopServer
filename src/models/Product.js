const { Model } = require('objection');

class Product extends Model {
	static get tableName() {
		return 'product';
	}

	static get idColumn() {
		return 'id';
	}

	static get relationMappings() {
		const Category = require('./Category')
		const Option = require('./Option')
		const ProductImage = require('./ProductImage')
		return {
			category: {
				relation: Model.BelongsToOneRelation,
				modelClass: Category,
				join: {
					from: 'product.category_id',
					to: 'category.id'
				}
			},
			options: {
				relation: Model.HasOneThroughRelation,
				modelClass: Option,
				join: {
					from: 'product.id',
					through: {
						from: 'filter_product_option.product_id',
						to: 'filter_product_option.option_id'
					},
					to: 'option.id'
				}
			},
			images: {
				relation: Model.HasManyRelation,
				modelClass: ProductImage,
				join: {
					from: 'product.id',
					to: 'product_image.product_id'
				}
			},
		}
	}
}

module.exports = Product
