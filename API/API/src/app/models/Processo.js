import Sequelize, { Model } from 'sequelize';

class tbprocesso extends Model {
  static init(sequelize) {
    super.init(
      {
        tipo_operacao: Sequelize.STRING,
        referencia: Sequelize.STRING,
        mercadoria: Sequelize.STRING,
        cliente_id: Sequelize.INTEGER,
        empresaexterior_id: Sequelize.INTEGER,
        colaborador_id: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.tbcliente, {
      foreignKey: 'cliente_id',
      as: 'cliente',
    });
    this.belongsTo(models.tbempresaexterior, {
      foreignKey: 'empresaexterior_id',
      as: 'empresa',
    });
    this.belongsTo(models.tbcolaborador, {
      foreignKey: 'colaborador_id',
      as: 'colaborador',
    });
  }
}

export default tbprocesso;
