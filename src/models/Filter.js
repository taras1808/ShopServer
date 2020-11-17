const { Model } = require('objection');

class Filter extends Model {
	static get tableName() {
		return 'filter';
	}

	static get idColumn() {
		return 'id';
    }

	static get relationMappings() {
		const Category = require('./Category')
		const Option = require('./Option')
		return {
			categories: {
				relation: Model.HasOneThroughRelation,
				modelClass: Category,
				join: {
					from: 'filter.id',
					through: {
						from: 'filter_category.filter_id',
						to: 'filter_category.category_id'
					},
					to: 'category.id'
				}
			},
			options: {
				relation: Model.HasManyRelation,
				modelClass: Option,
				join: {
					from: 'filter.id',
					to: 'option.filter_id'
				}
			}
		}
	}
}

module.exports = Filter
