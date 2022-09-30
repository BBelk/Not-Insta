//delete ofr unfollow
//post for follow
const router = require("express").Router();
const models = require('../../models');

const serialize = (data) => JSON.parse(JSON.stringify(data));

router.get('/', async (req, res) => {
  const relationshipData = await models.Relationship.findAll();
  res.json(relationshipData);
})

router.post('/', async (req, res) => {
  try {
    const relationshipData = await models.Relationship.create(req.body);
    console.log(relationshipData);
    res.json(relationshipData);
    //location.reload();
  } catch(err) {
    res.json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const relationshipData = await models.Relationship.destroy({ where: {followee_id: req.params.id, follower_id: req.session.user_id}});
    res.json(relationshipData);
  } catch(err) {
    res.json(err);
  }
});

module.exports = router;
