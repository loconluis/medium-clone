const User = require('../models/User')
const Article = require('../models/Article')
// add new user data
const addUser = (req, res, next) => {
  new User(req.body).save((err, user) => {
    if (err) {
      res.send(err)
    } else if (!user) {
      res.send(400)
    } else {
      res.send(user)
    }
    next()
  })
}
// get data from one user with specific ID
const getUser = (req, res, next) => {
  User.findById(req.params.id)
    .then((err, user) => {
      if (err) {
        res.send(err)
      } else if (!user) {
        res.send(400)
      } else {
        res.sendStatus(200).send(user)
      }
      next()
    })
}
// follow user 
const followUser = (req, res, next) => {
  User.findById(req.body.id)
    .then(user => user.follow(req.body.user.id))
    .then(res => res.json({ msg: "Followed!" }))
}
// get a profile for one user
// try to refactor
const getUserProfile = (req, res, next) => {
  User.findById(req.params.id)
    .then(_user => User.find({ 'following': req.params.id }))
    .then(_users => {
      _users.forEach(__user => __user.addFollower(__user))
      return Article.find({ author: req.params.id })
        .then(_articles => res.json({ user: _user, article: _article }))
    })
    .catch(e => console.log('err', e))
}

module.exports = {
  getUser,
  getUserProfile,
  addUser,
  followUser
}