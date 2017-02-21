module.exports = function(app) {
	app.use('/', require('./login.js'));
	app.use('/index', require('./main.js'));
	app.use('/login', require('./login.js'));
};