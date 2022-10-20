'use strict';

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
    await queryInterface.bulkInsert('Images', [
      {
        name: "banner1",
        url: "/img/carousels/Banner1.jpg",
        type: "carousel",
        fileName: "Banner1.jpg"
      },
      {
        name: "banner2",
        url: "/img/carousels/Banner2.jpg",
        type: "carousel",
        fileName: "Banner2.jpg"
      },
      {
        name: "banner3",
        url: "/img/carousels/Banner3.jpg",
        type: "carousel",
        fileName: "Banner3.jpg"
      },
      {
        name: "banner4",
        url: "/img/carousels/Banner4.jpg",
        type: "carousel",
        fileName: "Banner4.jpg"
      },
      {
        name: "banner5",
        url: "/img/carousels/Banner5.jpg",
        type: "carousel",
        fileName: "Banner5.jpg"
      },
      {
        name: "banner6",
        url: "/img/carousels/Banner6.jpg",
        type: "carousel",
        fileName: "Banner6.jpg"
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Images', null, {});
  }
};
