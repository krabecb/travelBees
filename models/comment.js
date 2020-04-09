const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
	text: String,
	date: {
		type: Date,
		default: Date.now
	},
	username: String,
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}
})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment