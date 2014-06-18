var express = require('express');
var app = express();


app.engine('html', require('./lwrnc-rendering').express);
app.set('view engine', 'html');

app.get('/', function(req, res) {
	res.render('template', { message: "This has been rendered using Lawrence's rendering engine" });
});

app.listen(3000);