"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class tbprocessoservico extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        numero_registro: _sequelize2.default.STRING,
        processo_id: _sequelize2.default.INTEGER,
        servico_id: _sequelize2.default.INTEGER,
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

exports. default = tbprocessoservico;
