var express = require('express');
var router = express.Router();
var User = require('../models/user');

var SurveyTemplate = require('../models/surveyTemplate');

router.post('/create', function(req, res) {
  if (req.user.usertype === "admin") {

    var newSurveyTemplate = new SurveyTemplate({
      name: req.body["name"],
      listquestion: req.body["listquestion[]"]
    });
    SurveyTemplate.createSurveyTemplate(newSurveyTemplate);
    res.send("200");
  }
});
router.get('/read', function(req, res) {
  SurveyTemplate.getAllSurveyTemplate(function(err,surveyTemplates){
    res.send(surveyTemplates);
  });
});
router.post('/update', function(req, res) {
  SurveyTemplate.updateSurveyTemplate(req.body["_id"],req.body["name"],req.body["listquestion[]"]);
  res.send("200");
});
router.post('/delete', function(req, res) {
  SurveyTemplate.delSurveyTemplate(req.body["_id"]);
  res.send("200");
});
module.exports = router;
