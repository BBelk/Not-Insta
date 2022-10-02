const router = require('express').Router();
const { Comment, User } = require('../../models'); 
const auth = require("../../utils/auth");

// {model: Comment,
//   include: 
//     {model: User,
//     as: "commentUser",
//   raw:false}
//   }
router.get('/get/id', async (req, res) => {
  try{
    const commentData = await Comment.findByPk(req.params.id, {
      include: [
        {model: User,
        as: "commentUser"}
      ]
    });
    const comment = commentData.get({ plain: true });
    res.status(200).json(comment);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/', auth, async (req, res) => {
  try {
    // console.log("GOT HERE" + req.body.body_text);
    console.log("GOT HERE", req);
    const newComment = await Comment.create({
      // ...req.body,
      body_text: req.body.new_c_body_text,
      user_id: req.session.user_id,
      post_id: req.body.id
    });
    


    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    
    console.log("GOT HERE: " + req.body.new_c_body_text + " " + req.body.id + " " + req.params.id);
   const commentData = await Comment.update({body_text: req.body.new_c_body_text},{
     where: {
       id: req.params.id
     }});
   res.status(200).json(commentData);
 } catch (err){
   res.status(500).json(err);
 }
});

router.delete('/:id', async (req, res) => {
  // delete one product by its `id` value
  try {
    const deletedComment = await Comment.destroy({ //sequelize.org
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(deletedComment);
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;