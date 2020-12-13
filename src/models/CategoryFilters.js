const { Model } = require('objection');

class CategoryFilters extends Model {
	static get tableName() {
		return 'filter_category';
	}
	
	static get idColumn() {
		return ['category_id', 'filter_id'];
    }
      
    static get relationMappings() {
		const Category = require('./Category')
		const Filter = require('./Filter')
		return {
			category: {
				relation: Model.HasOneRelation,
				modelClass: Category,
				join: {
					from: 'filter_category.category_id',
					to: 'category.id'
				}
			},
			filters: {
				relation: Model.ManyToManyRelation,
				modelClass: Filter,
				join: {
					from: 'filter_category.filter_id',
					to: 'filter.id'
				}
			},
		}
	}
}

module.exports = CategoryFilters
