"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class tbprocesso extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        tipo_operacao: _sequelize2.default.STRING,
        referencia: _sequelize2.default.STRING,
        mercadoria: _sequelize2.default.STRING,
        cliente_id: _sequelize2.default.INTEGER,
        empresaexterior_id: _sequelize2.default.INTEGER,
        colaborador_id: _sequelize2.default.INTEGER,
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

exports. default = tbprocesso;
