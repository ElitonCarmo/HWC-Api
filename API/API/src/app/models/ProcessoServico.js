import Sequelize, { Model } from 'sequelize';

class tbprocessoservico extends Model {
  static init(sequelize) {
    super.init(
      {
        numero_registro: Sequelize.STRING,
        processo_id: Sequelize.INTEGER,
        servico_id: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.tbprocesso, {
      foreignKey: 'processo_id',
      as: 'processo',
    });
    this.belongsTo(models.tbservico, {
      foreignKey: 'servico_id',
      as: 'servico',
    });
  }
}

export default tbprocessoservico;
