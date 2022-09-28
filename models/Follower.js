const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Follower extends Model {}

Follower.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6],
      },
    },
    profile_image_filename: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    friend_id:{
      type: DataTypes.INTEGER,
      allowNull: true,
    },

  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = Follower;
