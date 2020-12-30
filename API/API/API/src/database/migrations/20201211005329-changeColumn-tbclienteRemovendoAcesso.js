'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('tbcliente','cpf_cnpj',{
        type: Sequelize.STRING,
        allowNull:true,
        unique: false
      }), 
      queryInterface.changeColumn('tbcliente','email',{
        type: Sequelize.STRING,
        allowNull:true,
        unique: false
      }), 
      queryInterface.changeColumn('tbcliente','senha_hash',{
        type: Sequelize.STRING,
        allowNull:true,
        unique: false
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
   
  }
};
