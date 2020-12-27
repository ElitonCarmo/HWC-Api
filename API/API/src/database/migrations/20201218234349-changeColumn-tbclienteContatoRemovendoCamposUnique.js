'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('tbclientecontato','cpf_cnpj',{
        type: Sequelize.STRING,
        allowNull:true,
        unique: false
      }), 
    ]);
  },

  down: async (queryInterface, Sequelize) => {
   
  }
};
