var express=require('express');
var bodyParser = require('body-parser')
var app=express();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.set('view engine','ejs');
app.use(express.static('./public'));
app.get('/',function(req,res){
	res.render('main');
});
app.post('/',urlencodedParser,function(req,res){
	var jsonData = JSON.parse(req.body.data);
	console.log(jsonData);
	res.json(req.body);
});
app.listen(3000);
console.log('Running');