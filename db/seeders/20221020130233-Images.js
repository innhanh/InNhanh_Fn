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
      {
        name: "inbaothu",
        url: "/img/productions/inbaothu.jpg",
        type: "Productions",
        fileName: "inbaothu.jpg"
      },
      {
        name: "innamecard",
        url: "/img/productions/namecard.jpg",
        type: "Productions",
        fileName: "namecard.jpg"
      },
      {
        name: "intoroi",
        url: "/img/productions/toroi.jpg",
        type: "Productions",
        fileName: "toroi.jpg"
      },
      {
        name: "inmenu",
        url: "/img/productions/menu.jpg",
        type: "Productions",
        fileName: "menu.jpg"
      },
      {
        name: "incatalogue",
        url: "/img/productions/catalogue.jpg",
        type: "Productions",
        fileName: "catalogue.jpg"
      },
      {
        name: "infolder",
        url: "/img/productions/folder.jpg",
        type: "Productions",
        fileName: "folder.jpg"
      },
      {
        name: "inhoadon",
        url: "/img/productions/bill.jpg",
        type: "Productions",
        fileName: "bill.jpg"
      },
      {
        name: "inticker",
        url: "/img/productions/ticker.jpg",
        type: "Productions",
        fileName: "ticker.jpg"
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
