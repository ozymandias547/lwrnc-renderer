var express = require('express');
var fs = require('fs');
var lwrncRenderer = require('./lwrnc-renderer.js');
var app = express();

// app.engine('html', require('./lwrnc-rendering').express);
// app.set('view engine', 'html');

var templateString = fs.readFileSync('views/lwrnc-template.html', 'utf8' );

app.get('/', function(req, res) {
	res.send(lwrncRenderer.compose(templateString, {message: "This is a template rendered by Lawrence's engine"}));
	// TODO: Build it into the express .render method
});

app.listen(3000);