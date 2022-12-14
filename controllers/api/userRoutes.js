const router = require('express').Router();
const { User, Follower, Relationship } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.loggedIn = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/followers', async (req, res) =>{
  try{
    const followerData = await Follower.findAll();
    res.status(200).json(followerData);
  } catch(err){
    console.log(err);
  }
});

router.get('/followers/:id', async (req, res) =>{
  try{
    const followerData = await Follower.findOne({
      include: [
        {model: User, 
        as: "followees",
      } 
      ]
    });
    res.status(200).json(followerData);
  } catch(err){
    console.log(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.loggedIn = true;

      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id/follow/toggle', async (req, res) => {
  const userInstance = await User.findByPk(req.params.id);
  const followerInstance = await Follower.findByPk(req.session.user_id); //req.session.user_id
  const relationship = await Relationship.findOne({
    where: {
      follower_id: followerInstance.id,
      followee_id: userInstance.id
    }
  });
  if (relationship) {
    await relationship.destroy();
    await relationship.save();
  } else {
    await Relationship.create({
      follower_id: followerInstance.id,
      followee_id: userInstance.id
    });
  }
  const followee = await User.findByPk(req.params.id, {
    include: [{
      model: Follower,
      as: 'followers'
    }]
  });
  res.json(followee);
});

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
