var mongoose = require('mongoose');

// User Schema
var SurveySchema = mongoose.Schema({
	name: String,
	lecid: String,
	templateid: String,
	result: [{
		username: String,
		rate: [{
			type: Number
		}]
	}]
});

var Survey = module.exports = mongoose.model('Survey', SurveySchema);

module.exports.createSurvey = function(newSurvey){
	newSurvey.save();
}
module.exports.getSurveyById = function(id,callback){
	Survey.findById(id,callback);
}
module.exports.getAllSurvey = function(callback){
	Survey.find({},callback).select({ "name": 1, "_id": 1});
}
module.exports.delSurveyById = function(id){
	Survey.findByIdAndRemove(id,function(err,result){
	});
}
