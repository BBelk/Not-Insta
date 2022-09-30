const router = require('express').Router();
const { Comment, User } = require('../../models'); 

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

router.put('/:id', async (req, res) => {
  try {
   const commentData = await Comment.update(req.body, {
     where: {
       id: req.params.id
     }
   });
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