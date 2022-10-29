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
    await queryInterface.bulkInsert('Branchs', [
      {
        name: "In Nhanh",
        adress: "43D/10 Hồ Văn Huê - P.9 - Q.Phú Nhuận - TP.HCM",
        phone: "0888.229.079&&0918.196.669",
        email: "innhanh79@gmail.com",
        zalo: "0888.029.079",
        idCompany: 1
      },
      {
        name: "In Giá Tốt",
        adress: "29Bis Nguyễn Đình Chiểu - P.Đa Kao - Q.1 - TP.HCM",
        phone: "0888.229.079&&0918.196.669",
        email: "innhanh79@gmail.com",
        zalo: "0888.029.079",
        idCompany: 1
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
    await queryInterface.bulkDelete('Branchs', null, {});
  }
};
