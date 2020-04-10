const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

// REGISTRATION ROUTES

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
      const desiredFirstName = req.body.firstname
      const desiredLastName = req.body.lastname
      const desiredDate = req.body.date
      const desiredHometown = req.body.hometown
      const desiredEmail = req.body.email
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
        		password: hashedPassword,
            firstName: desiredFirstName,
            lastName: desiredLastName,
            dateOfBirth: desiredDate,
            hometown: desiredHometown,
            email: desiredEmail
      		})
      	req.session.loggedIn = true
  
  		req.session.userId = createdUser._id 
 	    req.session.username = createdUser.username
      req.session.firstName = createdUser.firstName
      req.session.lastName = createdUser.lastName
      req.session.dateOfBirth = createdUser.dateOfBirth
      req.session.hometown = createdUser.hometown
      req.session.email = createdUser.email
      	req.session.message = `Thanks for signing up, ${createdUser.username}`
      	res.redirect('/')
	   }

	} catch(err) {
		next(err)
	}
})

// LOGIN ROUTES 

// show form GET /auth/login
router.get('/login', (req, res) => {
	res.render('auth/login.ejs', {
  })
})

// login POST /auth/login
router.post('/login', async (req, res, next) => {
  
  try {
    const user = await User.findOne({ username: req.body.username })

    if(!user) {
      console.log("bad username");
      req.session.message = "Invalid username or password."
      res.redirect('/auth/login')
    
    } else {

      const loginInfoIsValid = bcrypt.compareSync(req.body.password, user.password)
      if(loginInfoIsValid) {
        req.session.loggedIn = true
        req.session.userId = user._id
        req.session.username = user.username
        req.session.firstName = user.firstName
        req.session.lastName = user.lastName
        req.session.dateOfBirth = user.dateOfBirth
        req.session.hometown = user.hometown
        req.session.email = user.email
        req.session.message = `Welcome back, ${user.username}!`
        res.redirect('/')

      } else {
        console.log("bad password");
        req.session.message = "Invalid username or password."
        res.redirect('/auth/login')
      }
    }
  } catch(err) {
    next(err)
  }
})

// logout GET /auth/logout
router.get('/logout', async (req, res) => {
  await req.session.destroy()
  res.redirect('/auth/login')
})

module.exports = router