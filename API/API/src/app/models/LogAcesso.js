import Sequelize, { Model } from 'sequelize';

class tblogacesso extends Model {
  static init(sequelize) {
    super.init(
      {
        cliente_id: Sequelize.INTEGER,
        dispositivo_acesso: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.tbcliente, {
      foreignKey: 'cliente_id',
      as: 'cliente',
    });
  }
}

export default tblogacesso;
