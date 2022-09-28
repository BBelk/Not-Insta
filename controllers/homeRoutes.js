const router = require("express").Router();
const { User, Post } = require("../models");

router.get("/", async (req, res) => {
  const postData = await Post.findAll({
    include: [
      {
        model: User,
      },
    ],
  });
  const posts = postData.map((post) => post.get());
  res.render("index", { posts, loggedIn: req.session.loggedIn });
});

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

module.exports = router;
