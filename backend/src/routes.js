const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');
const PostController = require('./controllers/PostController');
const LikeController = require('./controllers/LikeController');

const routes = new express.Router();
//multer para compreender o multipart form
const upload = multer(uploadConfig);

//route para ver lista de fotos e para publicar foto
routes.get('/posts', PostController.index);
routes.post('/posts',upload.single('image'), PostController.store);

//route para dar like
routes.post('/posts/:id/like',LikeController.store);

module.exports = routes;