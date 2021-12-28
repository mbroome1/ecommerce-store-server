'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      seq: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id: {
        allowNull: false,
        type: Sequelize.UUID,
        unique: true,
        defaultValue: Sequelize.UUIDV4
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
      first_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      last_name: {
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
        type: Sequelize.STRING,
        defaultValue: 'N/A'
      },
      is_admin: {
        allowNull: true,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      is_disabled: {
        allowNull: true,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      is_deleted: {
        allowNull: true,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};