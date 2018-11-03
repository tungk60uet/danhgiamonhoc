var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// User Schema
var UserSchema = mongoose.Schema({
	username: {
		type: String,
		index:true
	},
	password: String,
	name: String,
	usertype: String
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
}

module.exports.getUserByUsername = function(username, callback){
	var query = {username: username};
	User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}
module.exports.getAllUser = function(callback){
	User.find({},callback);
}
module.exports.delUserByUsername = function(username){
	var query = {username: username};
	User.deleteOne(query, function (err) {
  	if (err) return handleError(err);
	});
}
module.exports.updateUser = function(username,name,newpassword){
	this.getUserByUsername(username,function(err,user){
		user.name=name;
		bcrypt.genSalt(10, function(err, salt) {
				bcrypt.hash(newpassword, salt, function(err, hash) {
						user.password = hash;
						user.save();
				});
		});
	});
}
module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}
