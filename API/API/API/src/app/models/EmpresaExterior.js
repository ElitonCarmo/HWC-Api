import Sequelize, { Model } from 'sequelize';

class tbempresaexterior extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        nif: Sequelize.STRING,
        ativo: Sequelize.TINYINT,
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default tbempresaexterior;
