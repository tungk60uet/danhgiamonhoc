var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Survey = require('../models/survey');

router.post('/create', function(req, res) {
    var result=[];
    console.log();
    if (req.body["listuser[]"] instanceof Array) {
      req.body["listuser[]"].forEach(function(item){
       result.push({username:item,rate:[]});
      });
    } else {
      result.push({username:req.body["listuser[]"],rate:[]});
    }
    var newSurvey = new Survey({
      name: req.body["name"],
      lecid: req.body["lecid"],
      templateid: req.body["templateid"],
      result: result
    });
    Survey.createSurvey(newSurvey);
    res.send("200");
});
router.get('/read', function(req, res) {
  Survey.getAllSurvey(function(err,surveys){
    res.send(surveys);
  });
});
router.post('/readId', function(req, res) {
  Survey.getSurveyById(req.body["_id"],function(err,survey){
    res.send(survey);
  });
});
router.post('/update', function(req, res) {
//  Survey.updateSurvey(req.body["_id"],req.body["name"],req.body["listquestion[]"]);
  res.send("200");
});
router.post('/delete', function(req, res) {
  Survey.delSurveyById(req.body["_id"]);
  res.send("200");
});
module.exports = router;
