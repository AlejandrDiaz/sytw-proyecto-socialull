"use strict";


module.exports = function(app) {
	
	app.get('/', function(req, res) {
		res.render('login.ejs');
	});
	
	
	app.get('/inicio', function(req, res) {
		res.render('index.ejs');
	});
};



