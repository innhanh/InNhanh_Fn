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
    await queryInterface.bulkInsert('Companys', [{
      name: "InNhanh79",
      website: "www.innhanh79.vn",
      time: "Thứ 2 - Thứ 7&&Sáng: 8h00 - 12h00&&Chiều: 13h30 - 18h30",
      logo: "/logo/logo.png"
    }], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Companys', null, {});
  }
};
