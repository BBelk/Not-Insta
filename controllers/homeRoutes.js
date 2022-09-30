const router = require("express").Router();
const { User, Post, Comment, Relationship, Follower } = require("../models");
const auth = require("../utils/auth");

router.get("/", async (req, res) => {
  const postData = await Post.findAll({
    include: [
      {
        model: User,
      },
    ],
  });
  let ships;
  if (req.session.user_id) {
    const relationshipData = await Relationship.findAll({
      where: {
        followee_id: req.session.user_id,
      },
    });
    ships = relationshipData.map((relationship) => relationship.get());
  }
  const posts = postData.map((post) => post.get());
  res.render("homepage", { posts, ships, loggedIn: req.session.loggedIn });
});

router.get("/upload", auth, async (req, res) => {
  try {
    res.render("upload");
  } catch (err) {
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
    let isUser = false;
    if(req.session.user_id == user.id){
      isUser = true;
    }
    res.render("profile", { 
      user,
      isUser, 
      loggedIn: req.session.loggedIn });
  } catch (err) {
    res.json(err);
  }
});

const serialize = (data) => JSON.parse(JSON.stringify(data));

router.get("/user/:id", async (req, res) => {
  const pageId = req.params.id;
  try {
    const userData = await User.findByPk(req.params.id, {
      include: [
        {
          model: Post,
        },
        {
          model: Follower,
          as: 'followers'
        },
      ],
    });
    if (!userData) {
      res.status(404).json({ message: "No user found with this ID!" });
      return;
    }
    const user = userData.get({ plain: true });
    let isUser = false;
    let hasRelationship = false;
    if (req.session.user_id) {
      if(req.session.user_id == req.params.id){
        res.redirect("/profile");
        return;
      }
      if(req.session.user_id == user.id){
        isUser = true;
      }
      if(user.followers.find((follower) => follower.id === req.session.user_id)){
        hasRelationship = true;
      }
    }
    console.log("_______________", user.followers);
    console.log("_______________", hasRelationship);
    res.render("profile", {
      user,
      hasRelationship,
      isUser,
      pageId,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

router.get("/post/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {model: User, 
          // as: 'postUser'
          // attributes: ["username"],
        },
        {model: Comment,
        include: 
          {model: User,
          as: "commentUser",
          attributes: ['username'],
          raw: true}
        }
        ]},
      
      
    );
    
    if (!postData) {
      res.status(404).json({ message: "No post found with this ID!" });
      return;
    }
    // const posts = postData.map((post) => post.get());
    const post = postData.get({ plain: true });
    // const post = serialize(postData);
    // const post = postData;

    // let comments;
    // const commentData = await Comment.findAll({
    //   where: {
    //     post_id: req.params.id,
    //   },
    //   include: [
    //     {
    //       model: User,
    //     }
    //   ],
    // });
    // comments = commentData.map((comment) => comment.get());
    
    // console.log(comments, "=============================================")
    
    // const comments = commentData.get({ plain: true });
    console.log(post, "---------------================---------------");
    res.render("indivpost", { 
      post, 
      // comments, 
      loggedIn: req.session.loggedIn });
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
