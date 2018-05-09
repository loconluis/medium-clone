const mongoose = require('mongoose')

let UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  provider: String,
  provider_id: String,
  token: String,
  provider_pic: String,
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  following: [{
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    text: String
  }]
})

// functions
UserSchema.methods.follow = function (userID) {
  if (this.following.indexOf(userID) === -1) {
    this.following.push(userID)
  }
  
  return this.save()
}
ArticleSchema.methods.addFollower = function (follower) {
  this.follower.push(follower)
}

module.exports = mongoose.model('User', UserSchema)
