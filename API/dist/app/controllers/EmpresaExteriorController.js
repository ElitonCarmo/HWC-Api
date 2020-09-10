"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _EmpresaExterior = require('../models/EmpresaExterior'); var _EmpresaExterior2 = _interopRequireDefault(_EmpresaExterior);

class EmpresaExteriorController {
  async store(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails.' });
    }

    const empresa_Existe = await _EmpresaExterior2.default.findOne({
      where: { nome: req.body.nome },
    });

    if (empresa_Existe) {
      return res.status(400).json({ error: 'Empresa já existente.' });
    }

    const { id, nome, nif, ativo } = await _EmpresaExterior2.default.create(req.body);

    return res.json({
      id,
      nome,
      nif,
      ativo,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number(),
      nome: Yup.string(),
      ativo: Yup.boolean(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails.' });
    }

    const { id } = req.body;

    const empresaexterior = await _EmpresaExterior2.default.findByPk(req.body.id);

    if (id !== empresaexterior.id) {
      return res.status(400).json({ error: 'Empresa não existente.' });
    }

    const { nome, nif, ativo } = await empresaexterior.update(req.body);

    return res.json({
      id,
      nome,
      nif,
      ativo,
    });
  }

  async index(req, res) {
    const empresaexterior = await _EmpresaExterior2.default.findAll({
      attributes: ['id', 'nome', 'nif', 'ativo', 'created_at', 'updated_at'],
    });

    return res.json(empresaexterior);
  }

  async getEmpresasAtivas(req, res) {
    const empresaexterior = await _EmpresaExterior2.default.findAll({
      where: { ativo: 1 },
      attributes: ['id', 'nome', 'nif', 'ativo', 'created_at', 'updated_at'],
    });

    return res.json(empresaexterior);
  }
}

exports. default = new EmpresaExteriorController();
