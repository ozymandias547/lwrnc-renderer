var express = require('express');
var app = express();

app.engine('html', require('./lwrnc-renderer.js').renderFile);
app.set('view engine', 'html');

app.get('/', function(req, res) {
	res.render('lwrnc-template', { message: "This has been rendered using Lawrences engine" });
});

app.listen(3000);