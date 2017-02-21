var express = require('express'),
	path = require('path'),
	consolidate = require('consolidate');


var app = express();
var port = 3002;
app.engine('html', consolidate.ejs);
app.set('view engine', 'html');
app.set('views', path.resolve(__dirname, './views'));

app.locals.reload = true;

app.use(express.static(path.join(__dirname, '../dist')));
require('./routes')(app);
app.listen(port, function() {
	console.log('当前为发布环境，端口:' + port);
});