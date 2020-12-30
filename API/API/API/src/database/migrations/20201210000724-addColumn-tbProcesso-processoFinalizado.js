'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn('tbprocesso', 'processofinalizado',{
      type: Sequelize.INTEGER
    })
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn('tbprocesso', 'processofinalizado');
  }
};
