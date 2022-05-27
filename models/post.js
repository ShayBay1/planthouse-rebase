const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
  username: String,
  userId: { type: mongoose.Schema.Types.ObjectId },
  comment: String,
})

const postSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    photoUrl: String,
    caption: String,
    comment: [commentSchema],
  })
 

module.exports = mongoose.model('Post', postSchema);