module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('tbclientecontato', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      nome: {
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
      cpf_cnpj: {
        type: Sequelize.STRING,
        unique: false,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      senha_hash: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ativo: {
        type: Sequelize.TINYINT,
        defaultValue: true,
        allowNull: false,
      },
      envio_email: {
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
    return queryInterface.dropTable('tbclientecontato');
  },
};
