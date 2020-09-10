"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class tbservico extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        nome_servico: _sequelize2.default.STRING,
        ativo: _sequelize2.default.TINYINT,
      },
      {
        sequelize,
      }
    );
  }
}

exports. default = tbservico;
