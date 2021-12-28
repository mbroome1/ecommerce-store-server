'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('products', [
      {
        id: 1000,
        title: 'Chalkboard',
        description: 'Express your thoughts with this fun sized chalkboard',
        category: 'test',
        gender: 'n/a',
        price: 10.50,
        image: 'chalkboard.jpg',
        is_hidden:false,
        is_deleted:false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 2000,
        title: 'Coffee Machine',
        description: 'Barrista grade coffee machine for your home',
        category: 'test',
        gender: 'n/a',
        price: 19.99,
        image: 'coffee-machine.jpg',
        is_hidden:false,
        is_deleted:false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 3000,
        title: 'Coffee Filter',
        description: 'Premium Coffee Grain Filter',
        category: 'test',
        gender: 'n/a',
        price: 29.99,
        image: 'coffee-filter.jpg',
        is_hidden:false,
        is_deleted:false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 4000,
        title: 'A Laptop',
        description: 'Powerful business laptop for business needs',
        category: 'test',
        gender: 'n/a',
        price: 49.99,
        image: 'laptop.jpg',
        is_hidden:false,
        is_deleted:false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 5000,
        title: 'Business Shirt',
        description: 'Tailored fit premium business shirt',
        category: 'test',
        gender: 'female',
        price: 9.99,
        image: 'shirt.jpg',
        is_hidden:false,
        is_deleted:false,
        created_at: new Date(),
        updated_at: new Date()
      }
      
    ],{validate: true});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('products', null, {});

  }
};
