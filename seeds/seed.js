const sequelize = require("../config/connection");
const { User, Post, Comment, Relationship } = require("../models");

const userData = require("./userData.json");
const postData = require("./postData.json");
const commentData = require("./commentData.json");
const relationshipData = require("./relationshipData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  console.log("---------- USER DATA CREATED ----------");

  await Post.bulkCreate(postData, {});

  console.log("---------- POST DATA CREATED ----------");

  await Comment.bulkCreate(commentData, {});

  console.log("---------- COMMENT DATA CREATED ----------");

  await Relationship.bulkCreate(relationshipData, {});

  console.log("---------- RELATIONSHIP DATA CREATED ----------");

  process.exit(0);
};

seedDatabase();
