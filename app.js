const express = require('express')
const bodyParser = require('body-parser')
const apiRouter = require('./src/routes/ApiRoute')
const db = require('./src/models/Knex')

const app = express()

app.all('/*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	next();
});

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api', apiRouter)

app.listen(7777, function() {
  	console.log('Example app listening on port 7777!')
});
