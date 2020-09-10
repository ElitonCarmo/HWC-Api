"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _Servico = require('../models/Servico'); var _Servico2 = _interopRequireDefault(_Servico);

class ServicoController {
  async store(req, res) {
    const schema = Yup.object().shape({
      nome_servico: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails.' });
    }

    const servico_Existe = await _Servico2.default.findOne({
      where: { nome_servico: req.body.nome_servico },
    });

    if (servico_Existe) {
      return res.status(400).json({ error: 'Serviço já existente.' });
    }

    const { id, nome_servico, ativo } = await _Servico2.default.create(req.body);

    return res.json({
      id,
      nome_servico,
      ativo,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number(),
      nome_servico: Yup.string(),
      ativo: Yup.boolean(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails.' });
    }

    const { id } = req.body;

    const servico = await _Servico2.default.findByPk(req.body.id);

    if (id !== servico.id) {
      return res.status(400).json({ error: 'Serviço não existente.' });
    }

    const { nome_servico, ativo } = await servico.update(req.body);

    return res.json({
      id,
      nome_servico,
      ativo,
    });
  }

  async index(req, res) {
    const servico = await _Servico2.default.findAll({
      attributes: ['id', 'nome_servico', 'ativo', 'created_at', 'updated_at'],
    });

    return res.json(servico);
  }

  async getServicosAtivos(req, res) {
    const servico = await _Servico2.default.findAll({
      where: { ativo: 1 },
      attributes: ['id', 'nome_servico', 'ativo', 'created_at', 'updated_at'],
    });

    return res.json(servico);
  }
}

exports. default = new ServicoController();
