const router = require('express').Router();
const { Comment } = require('../../models'); 


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