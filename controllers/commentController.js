const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Post = require('../models/post')
const Comment = require('../models/comment')

router.post('/:postId', async (req, res, next) => {
	try {
	const post = await Post.findById(req.params.postId).populate('user')
	const commentToCreate = {
		text: req.body.text,
		username: res.locals.username,
		user: res.locals.userId
	}
	post.comments.push(commentToCreate)

	console.log('This is commentToCreate');
	console.log(commentToCreate);

	await post.save()

	res.redirect('/posts/' + post.id)


	} catch(err) {
		next(err)
	} 
})



module.exports = router