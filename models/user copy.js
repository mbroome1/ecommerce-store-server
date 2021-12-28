'use strict';
const {
  Model,
  Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  user.init({
    seq: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    id: {
      allowNull: false,
      type: Sequelize.UUID
    },
    username: {
      allowNull: true,
      unique: true,
      type: Sequelize.STRING
    },
    password: {
      allowNull: false,
      type: Sequelize.STRING
    },
    firstName: {
      allowNull: false,
      type: Sequelize.STRING
    },
    lastName: {
      allowNull: false,
      type: Sequelize.STRING
    },
    email: {
      allowNull: false,
      unique: true,
      type: Sequelize.STRING
    },
    gender: {
      allowNull: true,
      type: Sequelize.STRING
    },
    isAdmin: {
      allowNull: true,
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    isDisabled: {
      allowNull: true,
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    isDeleted: {
      allowNull: true,
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }, {
    sequelize,
    modelName: 'user',
    underscored: true
  });
  return user;
};