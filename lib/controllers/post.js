const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Post = require('../models/Post');

module.exports = Router()
  .get('/', authenticate, async (req, res, next) => {
    try {
      const posts = await Post.getPosts();
      res.json(posts);
    } catch (error) {
      next(error);
    }
  })
  // POST { post } to /api/v1/posts creates a new post for the signed in user
  .post('/', authenticate, async (req, res, next) => {
    try {
      const newPost = await Post.createPost();
      res.json(newPost);
    } catch (error) {
      next(error);
    }
  });
