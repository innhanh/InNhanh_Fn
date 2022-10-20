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
    await queryInterface.bulkInsert('Users', [
      {
      userName: "admin",
      pass: "admin",
      email: "admin@gmail.com",
      phone: "0943830707",
      avatar: "http://localhost:3000/vercel.svg",
      type: "Admin"
    },
    {
      userName: "admin2",
      pass: "admin2",
      email: "admin2@gmail.com",
      phone: "0943830707",
      avatar: "http://localhost:3000/vercel.svg",
      type: "Client"
    },
    {
      userName: "admin3",
      pass: "admin3",
      email: "admin2@gmail.com",
      phone: "0943830707",
      avatar: "http://localhost:3000/vercel.svg",
      type: "Staff"
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
    await queryInterface.bulkDelete('Users', null, {});
  }
};
