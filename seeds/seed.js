const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  console.log("---------- USER DATA CREATED ----------");
  
  await Post.bulkCreate(postData, {
    individualHooks: true,
    returning: true,
  });

  console.log("---------- POST DATA CREATED ----------");

  await Comment.bulkCreate(commentData, {
    individualHooks: true,
    returning: true,
  });

  console.log("---------- COMMENT DATA CREATED ----------");

  process.exit(0);
};

seedDatabase();
