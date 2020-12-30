const { Model } = require('objection');

class User extends Model {
	static get tableName() {
		return 'user';
	}
	
	static get idColumn() {
		return 'id';
    }
}

module.exports = User
