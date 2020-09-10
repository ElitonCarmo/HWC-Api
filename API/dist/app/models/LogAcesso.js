"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class tblogacesso extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        cliente_id: _sequelize2.default.INTEGER,
        dispositivo_acesso: _sequelize2.default.STRING,
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

exports. default = tblogacesso;
