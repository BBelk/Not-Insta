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


module.exports = { User, Post, Comment, Relationship, Follower };