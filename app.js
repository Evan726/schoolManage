require('babel-register')
	//console.log("1----------------1:", process.env.NODE_ENV)
if (process.env.NODE_ENV == "dev") {
	require('./server/index.dev')
} else {
	require('./server/index.production')
}