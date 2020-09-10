"use strict";module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('tbprocessostatus', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      processo_servico_id: {
        type: Sequelize.INTEGER,
        references: { model: 'tbprocessoservico', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
      descricao_status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      notifica_cliente: {
        type: Sequelize.TINYINT,
        defaultValue: true,
        allowNull: false,
      },
      exibe_cliente: {
        type: Sequelize.TINYINT,
        defaultValue: true,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface) => {
    return queryInterface.dropTable('tbprocessostatus');
  },
};
