require('dotenv').config()
const express = require('express')
const server = express()
const PORT = process.env.PORT

//MIDDLEWARE
server.use(express.static('public'))

//CONTROLLERS


//ROUTES
server.get('/', (req, res) => {
	res.render('home.ejs')
})



server.listen(PORT, () => {
	const d = new Date()
	console.log(`${d.toLocaleString()}: Server is running on port: ${PORT}`)
})