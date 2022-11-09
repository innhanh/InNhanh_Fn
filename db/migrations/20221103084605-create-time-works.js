'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TimeWorks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      week: {
        type: Sequelize.STRING
      },
      morning: {
        type: Sequelize.STRING
      },
      afternoon: {
        type: Sequelize.STRING
      },
      idCompany: {
        type: Sequelize.INTEGER,
        references: {
          model: "Companys",
          key: "id"
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('TimeWorks');
  }
};