const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');
const Relationship = require('./Relationship');
const Follower = require('./Follower');

Post.belongsTo(User, {
  foreignKey: "user_id"
});

User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id'
});

Post.hasMany(Comment, {
  foreignKey: 'post_id'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id'
});
//THIS IS THE USER_ID of RELATIONSHIP
User.belongsToMany(Follower, { 
  as: 'followers',
  foreignKey: 'user_id',
  through: Relationship
});

//THIS IS THE FRIEND_ID of RELATIONSHIP
Follower.belongsToMany(User, { 
  as: 'followees',
  foreignKey: 'follower_id',
  through: Relationship
});


// 'use strict';

// const fs = require('fs');
// const path = require('path');
// const Sequelize = require('sequelize');
// const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'development';
// const config = require(__dirname + '/../config/config.json')[env];
// const db = {};

// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
//   })
//   .forEach(file => {
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//   });

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// module.exports = db;


module.exports = { User, Post, Comment, Relationship, Follower };