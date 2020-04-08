const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

//ROUTES

// registration form
router.get('/register', (req, res) => {
	res.render('auth/register.ejs')
})

// register route: POST /auth/register
router.post('/register', async (req, res, next) => {
	try {
		console.log(req.body);
		const desiredUsername = req.body.username
    	const desiredPassword = req.body.password
    	const userWithThisUsername = await User.findOne({
      		username: desiredUsername
    	})
    	console.log(userWithThisUsername);
    	if(userWithThisUsername) { 
      		console.log("username exists")
      		req.session.message = `Username ${desiredUsername} already taken.`
      		res.redirect('/auth/register')
	    } else {
	    	const salt = bcrypt.genSaltSync(10)
      		const hashedPassword = bcrypt.hashSync(desiredPassword, salt)
     		const createdUser = await User.create({
        		username: desiredUsername,
        		password: hashedPassword
      		})
      	req.session.loggedIn = true
  
  		req.session.userId = createdUser._id 
 	    req.session.username = createdUser.username
      	req.session.message = `Thanks for signing up, ${createdUser.username}`
      	res.redirect('/')
	   }

	} catch(err) {
		next(err)
	}
})

module.exports = router