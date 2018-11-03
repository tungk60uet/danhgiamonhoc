var express = require('express');
var router = express.Router();
var User = require('../models/user');
// Get Homepage
router.get('/', ensureAuthenticated, function(req, res){
	if(req.user.usertype==='admin')
	{
			res.render('adminDashboard');
	}
	else
	res.send('dan thuong :))');
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.render('login');
	}
}
module.exports = router;
