module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('tbprocessoservico', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      numero_registro: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      processo_id: {
        type: Sequelize.INTEGER,
        references: { model: 'tbprocesso', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
      servico_id: {
        type: Sequelize.INTEGER,
        references: { model: 'tbservico', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
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
    return queryInterface.dropTable('tbprocessoservico');
  },
};
