'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Partners', [
      {
        name: 'BCA',
        idImage: 15
      },
      {
        name: 'CMN',
        idImage: 16
      },
      {
        name: 'HNAM',
        idImage: 17
      },
      {
        name: 'HP',
        idImage: 18
      },
      {
        name: 'Nagecco',
        idImage: 19
      },
      {
        name: 'TheCliff',
        idImage: 20
      },
      {
        name: 'Thefine',
        idImage: 21
      },
      {
        name: 'VinHome',
        idImage: 22
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('Partners', null, {});
     */
    await queryInterface.bulkDelete('Partners', null, {});
  }
};
