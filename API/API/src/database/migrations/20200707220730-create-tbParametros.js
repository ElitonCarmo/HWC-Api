module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('tbparametros', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      nome_empresa: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nome_logo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      logo_path: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      cpf_cnpj: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      login: {
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
    return queryInterface.dropTable('tbparametros');
  },
};
