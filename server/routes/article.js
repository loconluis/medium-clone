// handlers for routes of articles
const express = require('express')
const multipart = require('connect-multiparty')
const multiparWare = multipart()
// instance of the router (Express)
const api = express.Router();
// controller of the api
const articleCTRL = require('../controllers/article.controller')
// letsGo
api.get('/articles', articleCTRL.getAll)
api.get('/article/:id', articleCTRL.getArticle)
api.post('/article', articleCTRL.addArticle)
api.post('/article/comment', articleCTRL.commentArticle)
// export routes
module.exports = api
