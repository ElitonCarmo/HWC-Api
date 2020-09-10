"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class tbprocessostatus extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        processo_servico_id: _sequelize2.default.INTEGER,
        descricao_status: _sequelize2.default.STRING,
        notifica_cliente: _sequelize2.default.TINYINT,
        exibe_cliente: _sequelize2.default.TINYINT,
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

exports. default = tbprocessostatus;
