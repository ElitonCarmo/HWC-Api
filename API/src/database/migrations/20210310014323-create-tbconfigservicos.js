module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('tbconfigservicos', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      apikey_email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      urlapi_email: {
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
    return queryInterface.dropTable('tbconfigservicos');
  },
};
