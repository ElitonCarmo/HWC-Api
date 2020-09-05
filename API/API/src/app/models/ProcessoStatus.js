import Sequelize, { Model } from 'sequelize';

class tbprocessostatus extends Model {
  static init(sequelize) {
    super.init(
      {
        processo_servico_id: Sequelize.INTEGER,
        descricao_status: Sequelize.STRING,
        notifica_cliente: Sequelize.TINYINT,
        exibe_cliente: Sequelize.TINYINT,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.tbprocessoservico, {
      foreignKey: 'processo_servico_id',
      as: 'processo_Servico',
    });
  }
}

export default tbprocessostatus;
