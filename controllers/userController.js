const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Comment = require('../models/comment')



router.get('/', (req, res) => {
	res.render('user/show.ejs')
})

module.exports = router