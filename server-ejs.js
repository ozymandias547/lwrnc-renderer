var express = require('express');
var app = express();


app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/', function(req, res) {
	res.render('template', { message: "This has been rendered using EJS" });
});

app.get('/*', function(req, res) {
	res.send('page not found');
});

app.listen(3000);