// handlers for routes of articles
const express = require('express')
const multipart = require('connect-multiparty')
const multiparWare = multipart()
// instance of the router (Express)
const api = express.Router();
// controller of the api
const userController = require('../controllers/user.controller')
// letsGo
api.get('/user/:id', userController.getUser)
api.get('/user/profile/:id', userController.getUserProfile)
api.post('/user', userController.addUser)
api.post('/user/follow', userController.followUser)
// export routes
module.exports = api
