"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn("messages", "status", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn("messages", "status");
  },
};
