"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.renameColumn("messages", "status", "readStatus");
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.renameColumn("messages", "readStatus", "status");
  },
};
