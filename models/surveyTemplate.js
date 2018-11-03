var mongoose = require('mongoose');

// User Schema
var SurveyTemplateSchema = mongoose.Schema({
	name: String,
	listquestion: [{
		type: String
	}]
});

var SurveyTemplate = module.exports = mongoose.model('SurveyTemplate', SurveyTemplateSchema);

module.exports.createSurveyTemplate = function(newSurveyTemplate){
	newSurveyTemplate.save();
}
module.exports.getAllSurveyTemplate = function(callback){
	SurveyTemplate.find({},callback);
}
module.exports.updateSurveyTemplate = function(id,newName,newListQuestion){
	SurveyTemplate.findByIdAndUpdate(id,{name:newName,listquestion:newListQuestion},function(err,result){
	});
}
module.exports.delSurveyTemplate = function(id){
	console.log(id);
	SurveyTemplate.findByIdAndRemove(id,function(err,result){
	});
}
