const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const auth = require("../utils/auth");

router.get("/", async (req, res) => {
  const postData = await Post.findAll({
    include: [
      {
        model: User,
      },
    ],
  });
  const posts = postData.map((post) => post.get());
  res.render("homepage", { posts, loggedIn: req.session.loggedIn });
});

router.get("/upload", auth, async (req, res) => {
  try {
    res.render("upload");
  }catch(err) {
    res.json(err);
  }
});

router.get("/profile", auth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      include: [
        {
          model: Post, 
        },
      ],
    });
    if (!userData) {
      res.status(404).json({ message: "No user found with this ID!" });
      return;
    }
    const user = userData.get({ plain: true });
    res.render("userwall", { ...user, loggedIn: req.session.loggedIn });
  } catch(err) {
    res.json(err);
  }
});
router.get("/post/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          include: [User],
        },
      ],
    });
    if (!postData) {
      res.status(404).json({ message: "No post found with this ID!" });
      return;
    }
    const post = postData.get({ plain: true });
    res.render("indivpost", { ...post, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
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
