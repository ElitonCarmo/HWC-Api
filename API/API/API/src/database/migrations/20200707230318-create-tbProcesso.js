module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('tbprocesso', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      tipo_operacao: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      referencia: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      mercadoria: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cliente_id: {
        type: Sequelize.INTEGER,
        references: { model: 'tbcliente', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
      empresaexterior_id: {
        type: Sequelize.INTEGER,
        references: { model: 'tbempresaexterior', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
      colaborador_id: {
        type: Sequelize.INTEGER,
        references: { model: 'tbcolaborador', key: 'id' },
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
    return queryInterface.dropTable('tbprocesso');
  },
};
