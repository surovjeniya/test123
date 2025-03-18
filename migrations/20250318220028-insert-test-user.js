"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      {
        tableName: "users",
      },
      [
        {
          userId: 1000000,
          balance: 10000,
        },
      ]
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete({ tableName: "users" }, [
      {
        userId: 1000000,
      },
    ]);
  },
};
