"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _sequelize = require('sequelize');
var _ProcessoServico = require('../models/ProcessoServico'); var _ProcessoServico2 = _interopRequireDefault(_ProcessoServico);
var _Processo = require('../models/Processo'); var _Processo2 = _interopRequireDefault(_Processo);
var _Servico = require('../models/Servico'); var _Servico2 = _interopRequireDefault(_Servico);
var _Cliente = require('../models/Cliente'); var _Cliente2 = _interopRequireDefault(_Cliente);
var _Colaborador = require('../models/Colaborador'); var _Colaborador2 = _interopRequireDefault(_Colaborador);
var _EmpresaExterior = require('../models/EmpresaExterior'); var _EmpresaExterior2 = _interopRequireDefault(_EmpresaExterior);

class ProcessoServicoController {
  async store(req, res) {
    const schema = Yup.object().shape({
      processo_id: Yup.number().required(),
      servico_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails.' });
    }

    const processo_Existe = await _Processo2.default.findOne({
      where: { id: req.body.processo_id },
    });

    const servico_Existe = await _Servico2.default.findOne({
      where: { id: req.body.servico_id },
    });

    if (!processo_Existe) {
      return res.status(400).json({ error: 'Processo não existe.' });
    }

    if (!servico_Existe) {
      return res.status(400).json({ error: 'Serviço não existe.' });
    }

    const {
      id,
      numero_registro,
      processo_id,
      servico_id,
    } = await _ProcessoServico2.default.create(req.body);

    return res.json({
      id,
      numero_registro,
      processo_id,
      servico_id,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
      processo_id: Yup.number().required(),
      servico_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails.' });
    }

    const { id } = req.body;

    const processoservico = await _ProcessoServico2.default.findByPk(req.body.id);

    if (id !== processoservico.id) {
      return res.status(400).json({ error: 'Processo Serviço não existente.' });
    }

    const processo_Existe = await _Processo2.default.findOne({
      where: { id: req.body.processo_id },
    });

    const servico_Existe = await _Servico2.default.findOne({
      where: { id: req.body.servico_id },
    });

    if (!processo_Existe) {
      return res.status(400).json({ error: 'Processo não existe.' });
    }

    if (!servico_Existe) {
      return res.status(400).json({ error: 'Serviço não existe.' });
    }

    const {
      numero_registro,
      processo_id,
      servico_id,
    } = await processoservico.update(req.body);

    return res.json({
      id,
      numero_registro,
      processo_id,
      servico_id,
    });
  }

  async index(req, res) {
    const processoServico = await _ProcessoServico2.default.findAll({
      attributes: [
        'id',
        'numero_registro',
        'processo_id',
        'servico_id',
        'created_at',
        'updated_at',
      ],
      include: [
        {
          model: _Processo2.default,
          as: 'processo',
          attributes: [
            'id',
            'tipo_operacao',
            'referencia',
            'mercadoria',
            'cliente_id',
            'empresaexterior_id',
            'colaborador_id',
          ],
          include: [
            {
              model: _Cliente2.default,
              as: 'cliente',
              attributes: ['id', 'nome'],
            },
            {
              model: _EmpresaExterior2.default,
              as: 'empresa',
              attributes: ['id', 'nome'],
            },
            {
              model: _Colaborador2.default,
              as: 'colaborador',
              attributes: ['id', 'nome'],
            },
          ],
        },
        {
          model: _Servico2.default,
          as: 'servico',
          attributes: ['id', 'nome_servico'],
        },
      ],
    });

    return res.json(processoServico);
  }

  async getTotalServicos(req, res) {
    const total = await _ProcessoServico2.default.count({
      where: { servico_id: req.params.id, numero_registro: { [_sequelize.Op.ne]: '' } },      
    });

    return res.json(total+1);
  }

  async getServicosDoProcesso(req, res) {
    const servico = await _ProcessoServico2.default.findAll({
      where: { processo_id: req.query.idProcesso },
      attributes: [
        'id',
        'numero_registro',
        'processo_id',
        'servico_id',
        'created_at',
        'updated_at',
      ],
    });

    return res.json(servico);
  }
}

exports. default = new ProcessoServicoController();
