"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

class tbcolaborador extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        nome: _sequelize2.default.STRING,
        nome_logo: _sequelize2.default.STRING,
        logo_path: _sequelize2.default.STRING,
        cpf_cnpj: _sequelize2.default.STRING,
        email: _sequelize2.default.STRING,
        senha: _sequelize2.default.VIRTUAL,
        senha_hash: _sequelize2.default.STRING,
        ativo: _sequelize2.default.TINYINT,
        tipo: _sequelize2.default.STRING,
        url: {
          type: _sequelize2.default.VIRTUAL,
          get() {
            return `${process.env.APP_URL}/files/${this.logo_path}`;
          },
        },
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async (colaborador) => {
      if (colaborador.senha) {
        colaborador.senha_hash = await _bcryptjs2.default.hash(colaborador.senha, 8);
      }
    });

    return this;
  }

  checkPassword(senha) {
    return _bcryptjs2.default.compare(senha, this.senha_hash);
  }
}

exports. default = tbcolaborador;
