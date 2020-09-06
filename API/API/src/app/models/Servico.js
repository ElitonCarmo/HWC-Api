import Sequelize, { Model } from 'sequelize';

class tbservico extends Model {
  static init(sequelize) {
    super.init(
      {
        nome_servico: Sequelize.STRING,
        ativo: Sequelize.TINYINT,
      },
      {
        sequelize,
      }
    );
  }
}

export default tbservico;
