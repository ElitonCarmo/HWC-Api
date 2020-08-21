module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'tbcliente',
      {
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
        nome_logo: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        logo_path: {
          type: Sequelize.STRING,
          allowNull: true,
          unique: true,
        },
        cpf_cnpj: {
          type: Sequelize.STRING,
          unique: true,
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
        envio_email: {
          type: Sequelize.TINYINT,
          defaultValue: true,
          allowNull: false,
        },
        ativo: {
          type: Sequelize.TINYINT,
          defaultValue: true,
          allowNull: false,
        },
        tipo: {
          type: Sequelize.STRING,
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
      },
      { freezeTableName: true }
    );
  },

  down: async (queryInterface) => {
    return queryInterface.dropTable('tbcliente');
  },
};
