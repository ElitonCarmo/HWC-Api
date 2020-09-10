"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _Cliente = require('../models/Cliente'); var _Cliente2 = _interopRequireDefault(_Cliente);
var _Colaborador = require('../models/Colaborador'); var _Colaborador2 = _interopRequireDefault(_Colaborador);
var _auth = require('../../config/auth'); var _auth2 = _interopRequireDefault(_auth);

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      senha: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails.' });
    }

    const { email, senha } = req.body;

    const cliente = await _Cliente2.default.findOne({ where: { email, ativo: 1 } });

    const colaborador = await _Colaborador2.default.findOne({
      where: { email, ativo: 1 },
    });

    if (!cliente && !colaborador) {
      return res.status(401).json({ error: 'Usuário não encontrado.' });
    }

    if (!cliente && colaborador) {
      if (!(await colaborador.checkPassword(senha))) {
        return res.status(401).json({ error: 'Senha incorreta.' });
      }
    } else if (cliente && !colaborador) {
      if (!(await cliente.checkPassword(senha))) {
        return res.status(401).json({ error: 'Senha incorreta.' });
      }
    }

    const { id, nome, logo_path } =
      !cliente && colaborador ? colaborador : cliente;

    const flag = !cliente && colaborador ? 'colaborador' : 'cliente';

    let tipo = '';
    if (flag === 'colaborador') tipo = colaborador.tipo;

    return res.json({
      usuario: {
        id,
        nome,
        email,
        flag,
        logo_path,
        tipo,
      },
      token: _jsonwebtoken2.default.sign({ id }, _auth2.default.secret, {
        expiresIn: _auth2.default.expiresIn,
      }),
    });
  }
}

exports. default = new SessionController();
