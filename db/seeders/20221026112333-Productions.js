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
    await queryInterface.bulkInsert('Productions', [
      {
        name: "IN BAO THƯ",
        idImage: 7,
        size: "12 X 22, 17 X 23, 25 X 35",
        quantitative: "100gsm - 120gsm",
        typePaper: "Fort",
        tag: "In Nhanh, In Offset"
      },
      {
        name: "IN NAME CARD",
        idImage: 8,
        size: "12 X 22, 17 X 23, 25 X 35",
        quantitative: "100gsm - 120gsm",
        typePaper: "Fort",
        tag: "In Nhanh, In Offset"
      },
      {
        name: "IN TỜ RƠI",
        idImage: 9,
        size: "A5, A4, A3, SRA3, 13 x 19",
        quantitative: "120gsm - 350 gsm",
        typePaper: "Fort, Couche, Mỹ Thuật",
        tag: "In Nhanh, In Offset"
      },
      {
        name: "IN MENU",
        idImage: 10,
        size: "A5, A4, A3, SRA3, 13 x 19",
        quantitative: "120gsm - 350 gsm",
        typePaper: "Couche, Mỹ Thuật, Giấy Nhựa",
        tag: "In Nhanh, In Offset, Bấm Kim, Keo Gáy"
      },
      {
        name: "IN CATALOGUE",
        idImage: 11,
        size: "A4 Đứng , A4 Nằm Ngang , A5",
        quantitative: "Bìa, Ruột 150 gsm",
        typePaper: "Fort, Couche, Mỹ Thuật",
        tag: "In Nhanh, In Offset, Bấm Kim, Keo Gáy"
      },
      {
        name: "IN FOLDER",
        idImage: 12,
        size: "22x31x7",
        quantitative: "250 gsm - 300 gsm",
        typePaper: "Fort, Couche, Mỹ Thuật",
        tag: "Màng Bóng, Màng Mờ"
      },
      {
        name: "IN HÓA ĐƠN, BIỂU MẪU",
        idImage: 13,
        size: "14 x 20, 20 x 28",
        quantitative: "52 gsm - 55 gsm",
        typePaper: "Fort, Carbonless",
        tag: "2, 3, 4 liên, bấm kim, keo gáy"
      },
      {
        name: "IN TEM DECAL, STICKER",
        idImage: 14,
        size: "Tùy chọn",
        quantitative: "120 gsm",
        typePaper: "Decal giấy, Nhựa, Trong , Kraft",
        tag: "Cắt bế hình dạng theo yêu cầu"
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
    await queryInterface.bulkDelete('Productions', null, {});
  }
};
