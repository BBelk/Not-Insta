const router = require('express').Router();
const { User, Post } = require('../models');

router.get('/', async (req, res) => {
  const postData = await Post.findAll({
    include:[{
      model: User,
      },],
  });
  const posts = postData.map(post => post.get());
  res.render('index', { posts });
});

module.exports = router;
