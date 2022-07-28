const express = require('express')
const fileUpload = require('express-fileupload')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const apiRouter = require('./src/routes/ApiRoute')
const db = require('./src/models/Knex')
const cors = require('cors')

const app = express()
app.use(fileUpload())
app.use(cors())

// app.use('/*', function(req, res, next) {
// 	setTimeout(function(){ next() }, 100);
// })

app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('public'))

app.use('/api', apiRouter)

app.listen(7777, function () {
	console.log('Example app listening on port 7777!')
});
