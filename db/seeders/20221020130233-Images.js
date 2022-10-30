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
      //Partners
      {
        name: "bca",
        url: "/img/partners/bca.png",
        type: "Partners",
        fileName: "bca.png"
      },
      {
        name: "cmn",
        url: "/img/partners/CMN.png",
        type: "Partners",
        fileName: "CMN.png"
      },
      {
        name: "hnam",
        url: "/img/partners/hnam.png",
        type: "Partners",
        fileName: "hnam.png"
      },
      {
        name: "hp",
        url: "/img/partners/hp.png",
        type: "Partners",
        fileName: "hp.png"
      },
      {
        name: "nagecco",
        url: "/img/partners/nagecco.png",
        type: "Partners",
        fileName: "nagecco.png"
      },
      {
        name: "thecliff",
        url: "/img/partners/thecliff.png",
        type: "Partners",
        fileName: "thecliff.png"
      },
      {
        name: "thefine",
        url: "/img/partners/thefine.jpg",
        type: "Partners",
        fileName: "thefine.jpg"
      },
      {
        name: "vinhome",
        url: "/img/partners/vinhome.png",
        type: "Partners",
        fileName: "vinhome.png"
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
