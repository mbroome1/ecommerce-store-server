'use strict';
const { Model, Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.cartItem);
      this.belongsTo(models.user);
      this.belongsToMany(models.product, {through: models.cartItem});

    }
  };
  cart.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
  }, {
    sequelize,
    underscored: true,
    modelName: 'cart',
  });
  return cart;
};