'use strict';

const { Model } = require('sequelize');
class Gallery extends Model {}

Gallery.init(
  {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    url: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: 'gallery',
  }
);
module.exports = Gallery;
