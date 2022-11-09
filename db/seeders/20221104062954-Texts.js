'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Texts', [
      {
        name: "home1",
        text: "In nhanh là một lĩnh vực đang rất phát triển tại Việt Nam, đặt biệt là các thành phố lớn, thành phố du lịch, khi sự hội nhập đòi hỏi sự chuyên nghiệp và nhanh chóng chính xác cao cùng với đời sống kinh tế ngày càng đi lên thì quan điểm về quảng cáo, khuyến mãi cũng không ngừng thay đổi.",
        idPage: 5
      },
      {
        name: "home2",
        text: "Trong đó, xu hướng chung là mọi Khách Hàng ngày càng khắt khe hơn với những ấn phẩm quảng cáo, những thông điệp mà bất cứ Doanh Nghiệp nào cũng cần phải có, để tiếp cận thị trường, tiếp cận Khách Hàng tiềm năng của mình.",
        idPage: 5
      },
      {
        name: "home3",
        text: "Là một Doanh Nghiệp chuyên ngành in ấn giấy, chúng tôi mong muốn được góp một phần công sức của mình vào sự thành công và phát triển của quý vị.",
        idPage: 5
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Texts', null, {});
  }
};
