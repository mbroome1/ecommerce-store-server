'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('carts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      user_seq: {
        allowNull: false,
        type: Sequelize.INTEGER
    }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('carts');
  }
};