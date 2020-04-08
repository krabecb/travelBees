const express = require('express')
const router = express.Router()
const Post = require('../models/post')
const User = require('../models/user')

//ROUTES
router.get('/', async (req, res, next) => {
	try {
		const foundPosts = await Post.find().populate('user')
		console.log(foundPosts)
		res.render('posts/index.ejs', {
			posts: foundPosts,
			userId: req.session.userId
		})
	} catch(error) {
		next(error)
	}
})

//NEW -- !!!ADD LIB AND REQUIREAUTH!!!
router.get('/new', (req, res) => {
	res.render('posts/new.ejs', {
		userId: req.session.userId
	})
})

module.exports = router