const { Model } = require('objection');

class ProductImage extends Model {
	static get tableName() {
		return 'product_image';
	}

	static get idColumn() {
		return ['image'];
	}
}

module.exports = ProductImage
