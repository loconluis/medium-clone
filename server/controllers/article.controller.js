// controller
const Article = require('../models/Article')
const User = require('../models/User')

const fs = require('fs')
const cloudinary = require('cloudinary')

const addArticle = (req, res, next) => {
  // destructuring the request body
  let { text, title, claps, description } = req.body
  // options for uploader
  let optionsUploader = {
    resource_type: 'image',
    eager: [{ effect: 'sepia' }]
  }
  // callback function for uploader
  const uploaderCallback = (err, result) => {
    if (err) throw err;
    // if err doesnt exist
    let obj = {
      text,
      title,
      claps,
      description,
      feature_img: result.url != null ? result.url : ''
    }
    saveArticle(obj)
  }
  // if image exist
  if (req.files.image) {
    cloudinary.uploader.upload(req.files.image.path, uploaderCallback, optionsUploader)
  } else {
    saveArticle({ text, title, claps, description, feature_img: '' })
  }
}
// Save a one article
const saveArticle = (obj) => {
  new Article(obj).save((err, article) => {
    if (err) {
      res.send(err)
    } else if (!article) {
      res.send(400)
    } else {
      return article.addAuthor(req.body.authorID)
        .then(_article => res.send(_article))
        .catch(e => console.log('e', e))
    }

    next()
  })
}
// getAll the articles
const getAll = (req, res, next) => {
  Article.find(req.params.id)
    .populate('author')
    .populate('comments.author').exec((err, article) => {
      if (err) {
        res.send(err)
      } else if (!article) {
        res.send(400)
      } else {
        res.send(article)
      }
      next()
    })
}
// clap an article
const clapArticle = (req, res, next) => {
  Article.findById(req.body.article_id)
    .then(article => article.clap())
    .then((res) => res.json({ msg: "Done" }))
    .catch(next)
}
// comment an article
const commentArticle = (req, res, next) => {
  Article.findById(req.body.article_id)
    .then(article => article.comment({
      author: req.body.authorID,
      text: req.body.comment
    }))
    .then(res => res.json({ msg: "Done" }))
    .catch(next)
}
// get one Article 
const getArticle = (req, res, next) => {
  Article.findById(req.params.id)
    .populate('author')
    .populate('comments.author').exec((err, article) => {
      if (err) {
        res.send(err)
      } else if (!article) {
        res.send(400)
      } else {
        res.send(article)
      }
      next()
    })
}
// export functions
module.exports = {
  addArticle,
  saveArticle,
  getAll,
  clapArticle,
  commentArticle,
  getArticle
}