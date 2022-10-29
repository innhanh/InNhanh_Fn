'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Pages', [
      {
        name: 'Giới Thiệu',
        href: "/gioithieu",
        idCategory: 1
      },
      {
        name: 'Thanh Toán',
        href: "/thanhtoan",
        idCategory: 1
      },
      {
        name: 'Thỏa Thuận & Chính Sách',
        href: "/chinhsach",
        idCategory: 1
      },
      {
        name: 'Liên Hệ',
        href: "/lienhe",
        idCategory: 1
      },
      {
        name: 'Home',
        href: "/",
        idCategory: 2
      },
      {
        name: 'In Túi Giấy',
        href: "/tuigiay",
        idCategory: 3
      },
      {
        name: 'In Name Card',
        href: "/namecard",
        idCategory: 3
      },
      {
        name: 'Brochure',
        href: "/brochure",
        idCategory: 3
      },
      {
        name: 'In PP',
        href: "/pp",
        idCategory: 4
      },
      {
        name: 'In Decal',
        href: "/decal",
        idCategory: 4
      },
      {
        name: 'In Bản Vẽ',
        href: "/banve",
        idCategory: 5
      },
      {
        name: 'Dịch Vụ Thiết Kế',
        href: "/thietke",
        idCategory: 6
      },
      {
        name: 'Setup Events',
        href: "/setupevents",
        idCategory: 7
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Pages', null, {});
  }
};
