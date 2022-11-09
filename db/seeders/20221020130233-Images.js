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
      //Banner 6
      {
        name: "banner1",
        url: "/img/carousels/Banner1.jpg",
        type: "Carousel",
        fileName: "Banner1.jpg"
      },
      {
        name: "banner2",
        url: "/img/carousels/Banner2.jpg",
        type: "Carousel",
        fileName: "Banner2.jpg"
      },
      {
        name: "banner3",
        url: "/img/carousels/Banner3.jpg",
        type: "Carousel",
        fileName: "Banner3.jpg"
      },
      {
        name: "banner4",
        url: "/img/carousels/Banner4.jpg",
        type: "Carousel",
        fileName: "Banner4.jpg"
      },
      {
        name: "banner5",
        url: "/img/carousels/Banner5.jpg",
        type: "Carousel",
        fileName: "Banner5.jpg"
      },
      {
        name: "banner6",
        url: "/img/carousels/Banner6.jpg",
        type: "Carousel",
        fileName: "Banner6.jpg"
      },
      //Productions 8
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
      //Partners 8
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
      //Logo 1
      {
        name: "logo",
        url: "/img/logo/logo.png",
        type: "Logo",
        fileName: "logo.png"
      },
      //Intro 4
      {
        name: "intro1",
        url: "/img/intro/intro1.jpg",
        type: "Intro",
        fileName: "intro1.jpg"
      },
      {
        name: "intro2",
        url: "/img/intro/intro2.jpg",
        type: "Intro",
        fileName: "intro2.jpg"
      },
      {
        name: "intro3",
        url: "/img/intro/intro3.jpg",
        type: "Intro",
        fileName: "intro3.jpg"
      },
      {
        name: "intro4",
        url: "/img/intro/intro4.jpg",
        type: "Intro",
        fileName: "intro4.jpg"
      },
      //Avatar
      {
        name: "avatar",
        url: "/img/avatar/avatar.png",
        type: "Avatar",
        fileName: "avatar.png"
      },

    ], {});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Images', null, {});
  }
};
