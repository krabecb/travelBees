const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Comment = require('../models/comment')



router.get('/', (req, res) => {
	const firstName = req.session.firstName 
	const lastName = req.session.lastName
	const dateOfBirth = req.session.dateOfBirth
	const hometown = req.session.hometown
	const email = req.session.email
	console.log(req.session);
	res.render('user/show.ejs', {
		firstName: firstName,
		lastName: lastName,
		dateOfBirth: dateOfBirth,
		hometown: hometown,
		email: email
	})
})

module.exports = router