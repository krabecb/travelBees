const mongoose = require('mongoose')


const postSchema = new mongoose.Schema({
  title: String,
  city: String,
  country: String,
  date: Date,
  postDescription: String,
  postPicture: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true 
  },
  // comments: [Comment.schema]
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post