
'use strict';
const {
  Model,
  Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.cart, {through: models.cartItem});
      // this.belongsToMany(models.user, {through: models.cartItem});
    }
  };
  product.init({
    seq: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique:true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.STRING,
      allowNull: true
    },
    category: {
      type: Sequelize.STRING,
      allowNull: true
    },
    gender: {
      type: Sequelize.STRING,
      allowNull: true
    },
    price: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    image: {
      type: Sequelize.STRING,
      allowNull: false
    },
    isHidden: {
      allowNull: false,
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    isDeleted: {
      allowNull: false,
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
    modelName: 'product',
    underscored:true
  });
  return product;
};