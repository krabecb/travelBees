const express = require('express')
const router = express.Router()
const User = require('../models/user')

//ROUTES

// registration form
router.get('/register', (req, res) => {
	res.render('auth/register.ejs')
})


module.exports = router