const router = require("express").Router();
const { User, Post, Comment, Relationship, Follower } = require("../models");
const auth = require("../utils/auth");

const serialize = (data) => JSON.parse(JSON.stringify(data));

router.get("/", async (req, res) => {
  const postData = await Post.findAll({
    include: [
      {
        model: User,
      },
    ],
    order: [
      ['time_created', 'DESC']
    ]
  });
  let rootUser;
  if (req.session.user_id) {
    // const userData = await User.findByPk(req.session.user_id, {
    //   include: [{
    //     model: Follower,
    //     as: 'followers'
    //   }]
    // });
    const followerData = await Follower.findByPk(req.session.user_id, {
      include: [{
        model: User,
        as: 'followees'
      }]
    });
    rootUser = serialize(followerData);
    //rootUser = serialize(userData);
  }
  const posts = postData.map((post) => post.get());
  res.render("homepage", { posts, rootUser, loggedIn: req.session.loggedIn });
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
      order: [[Post, 'time_created', 'DESC']]
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
    let rootUser;
    const followerData = await Follower.findByPk(req.session.user_id, {
      include: [{
        model: User,
        as: 'followees'
      }]
    });
    rootUser = serialize(followerData);
    res.render("profile", { 
      user,
      rootUser,
      isUser, 
      loggedIn: req.session.loggedIn });
  } catch (err) {
    res.json(err);
  }
});

router.get('/get/:id', async (req, res) => {
  //testing comment
  try{
    const commentData = await Comment.findByPk(req.params.id, {
      include: [
        {model: User,
        as: 'commentUser'}
      ]
    });
    if (!commentData) {
      res.status(404).json({ message: "No comment found with this ID!" });
      return;
    }
    const comment = commentData.get({ plain: true });
    res.status(200).json(comment);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/user/:id", auth, async (req, res) => {
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
    let rootUser;
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
      const followerData = await Follower.findByPk(req.session.user_id, {
        include: [{
          model: User,
          as: 'followees'
        }]
      });
      rootUser = serialize(followerData);
    }
    console.log("_______________", user.followers);
    console.log("_______________", hasRelationship);
    res.render("profile", {
      user,
      rootUser,
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
          raw:false
          // as: 'postUser'
          // attributes: ["username"],
          
        },
        {model: Comment,
        include: 
          {model: User,
          as: "commentUser",
        raw:false},
        }
        ], raw:false},
      
      
    );
    
    if (!postData) {
      res.status(404).json({ message: "No post found with this ID!" });
      return;
    }
    // const posts = postData.map((post) => post.get());
    // console.log(postData, "---------------================---------------");
    const post = postData.get({ plain: true });
    // console.log(post, "---------------================---------------");
    let isUser = false;
    let rootUser;
    if(req.session.user_id === post.user.id){
      isUser = true;
    }
    const followerData = await Follower.findByPk(req.session.user_id, {
      include: [{
        model: User,
        as: 'followees'
      }]
    });
    rootUser = serialize(followerData);
    res.render("indivpost", { 
      post,
      rootUser,
      isUser,
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
