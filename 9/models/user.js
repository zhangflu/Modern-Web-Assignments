var mycrypt = require('./mycrypt');
var validator = require('../public/javascripts/validator');
module.exports = new dataManager();

function dataManager() {
	var db;
	var users;

	require('mongodb').MongoClient.connect('mongodb://localhost:27017/userData').then(function(newdb) {
		db = newdb;
		users = db.collection('users');
	}).then(showCurrentUsersNumber).then(function() {
		console.log('初始化完成！');
	}).catch();

	function showCurrentUsersNumber() {
		return users.find().toArray().then(function showCurrentUsersNumber(array) {
			console.log('存在的用户', array.length);
		});
	}

	return {
		findUser: function(username, password) {
			return users.findOne({username: username}).then(function(user) {
				if (!user || mycrypt.decrypt(user.password) !== password)
			        return Promise.reject("user doesn't exit");
			    return Promise.resolve(user);
			});
		},

		createUser: function(user) {
			return this.checkUser(user || {}).then(function(validUser) {
				validUser.password = mycrypt.encrypt(validUser.password);
				users.insert(validUser);
				return validUser;
			});
		},

		checkUser: function(user) {
			var FormatErrors = validator.findFormatErrors(user);
			return new Promise(function(resolve, reject) {
				FormatErrors? reject(FormatErrors): resolve(user);
			}).then(checkExistenceFunc('username', '用户名'))
				.then(checkExistenceFunc('sid', '学号'))
				.then(checkExistenceFunc('phone', '电话'))
				.then(checkExistenceFunc('email', '邮箱'));

			function checkExistenceFunc(name, chineseName) {
				return function(data) {
					var obj = {};
					obj[name] = data[name];
					return users.findOne(obj).then(function(foundData) {
						if (foundData)
							return Promise.reject(chineseName + '已存在');
						return Promise.resolve(data);
					});
				}
			}
		}
	}
}
