require('dotenv').config()
const express = require('express')
const server = express()
const bodyParser = require('body-parser')
const session = require('express-session')
const PORT = process.env.PORT

//DATABASE
require('./db/db')

//MIDDLEWARE
server.use(express.static('public'))
server.use(bodyParser.urlencoded({ extended: false}))
server.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false
}))
//CONTROLLERS
const authController = require('./controllers/authController')
server.use('/auth', authController)
const postController = require('./controllers/postController')
server.use('/posts', postController)

//ROUTES
server.get('/', (req, res) => {
	res.render('home.ejs')
})

//404
server.get('*', (req, res) => {
	res.status(404).render('404.ejs')
})



server.listen(PORT, () => {
	const d = new Date()
	console.log(`${d.toLocaleString()}: Server is running on port: ${PORT}`)
})