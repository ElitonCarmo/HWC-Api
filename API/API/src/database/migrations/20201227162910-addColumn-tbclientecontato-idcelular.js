'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn('tbclientecontato', 'id_celular',{
        type: Sequelize.STRING,
        allowNull: true,
    })
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn('tbclientecontato', 'id_celular');
  }
};
