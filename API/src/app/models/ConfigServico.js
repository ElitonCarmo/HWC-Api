import Sequelize, { Model } from 'sequelize';

class tbconfigservicos extends Model {
  static init(sequelize) {
    super.init(
      {
        apikey_email: Sequelize.STRING,
        urlapi_email : Sequelize.STRING,
        ativo: Sequelize.TINYINT,
      },
      {
        sequelize,
        tableName:'tbconfigservicos'
      }
    );
  }
}

export default tbconfigservicos;
