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
    await queryInterface.bulkInsert('Categorys', [
      {
        name: 'PageSystem',
      },
      {
        name: 'Home',
      },
      {
        name: 'In Nhanh',
        href: "innhanh"
      },
      {
        name: 'In Quảng Cáo',
        href: "inquangcao"
      },
      {
        name: 'In Bản vẽ',
      },
      {
        name: 'Dịch Vụ Thiết Kế',
      },
      {
        name: 'Setup Events',
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
    await queryInterface.bulkDelete('Categorys', null, {});
  }
};
