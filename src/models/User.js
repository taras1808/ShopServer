const { Model } = require('objection');

class User extends Model {
	static get tableName() {
		return 'user';
	}
	
	static get idColumn() {
		return 'id';
	}
	
	static get relationMappings() {
		const Product = require('./Product')
		return {
			favourite: {
				relation: Model.ManyToManyRelation,
				modelClass: Product,
				join: {
					from: 'user.id',
					through: {
						from: 'favourite.user_id',
						to: 'favourite.product_id'
					},
					to: 'product.id'
				}
			},
		}
	}
}

module.exports = User
