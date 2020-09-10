"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _LogAcesso = require('../models/LogAcesso'); var _LogAcesso2 = _interopRequireDefault(_LogAcesso);
var _Cliente = require('../models/Cliente'); var _Cliente2 = _interopRequireDefault(_Cliente);

class LogController {
  async store(req, res) {
    const schema = Yup.object().shape({
      cliente_id: Yup.number().required(),
      dispositivo_acesso: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails.' });
    }

    const cliente_Existe = await _Cliente2.default.findOne({
      where: { id: req.body.cliente_id },
    });

    if (!cliente_Existe) {
      return res.status(400).json({ error: 'Cliente não existe.' });
    }

    const { id, cliente_id, dispositivo_acesso } = await _LogAcesso2.default.create(req.body);

    return res.json({
      id,
      cliente_id,
      dispositivo_acesso,
    });
  }

  async index(req, res) {
    const log = await _LogAcesso2.default.findAll({
      attributes: [
        'id',
        'cliente_id',
        'dispositivo_acesso',
        'created_at',
        'updated_at',
      ],
      include: [
        {
          model: _Cliente2.default,
          as: 'cliente',
          attributes: ['id', 'nome'],
        },
      ],
    });

    return res.json(log);
  }
}

exports. default = new LogController();
