const router = require("express").Router();
const { Post, Comment, User } = require("../../models");

// get all posts
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll();
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get post by id
// router.get("/post/:id", async (req, res) => {
//   try {
//     const postData = await Post.findByPk(req.params.id, {
//       include: [
//         User,
//         {
//           model: Comment,
//           include: [User],
//         },
//       ],
//     });
//     if (!postData) {
//       res.status(404).json({ message: "No post found with this ID!" });
//       return;
//     }
//     const post = post.get({ plain: true });
//     res.render("indivpost", { post, loggedIn: req.session.loggedIn });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// create post
router.put("/:id", async (req, res) => {
  try {
    console.log("GOT HERE: " + req.body.new_body_text + " " + req.params.id);
    const postData = await Post.update({body_text: req.body.new_body_text}, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete one product by its `id` value
  try {
    const commentData = await Comment.destroy({
      where: {
        post_id: req.params.id,
      },
    });
    const deletedPost = await Post.destroy({ //sequelize.org
      where: {
        id: req.params.id
      }
    });
    
    res.status(200).json(deletedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
