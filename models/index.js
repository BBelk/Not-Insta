const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');
const Relationship = require('./Relationship');

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

User.belongsToMany(User, { 
  as: 'friends',
  foreignKey: 'user_id',
  through: Relationship
});
User.belongsToMany(User, { 
  as: 'userFriends',
  foreignKey: 'friend_id',
  through: Relationship
});


module.exports = { User, Post, Comment, Relationship };