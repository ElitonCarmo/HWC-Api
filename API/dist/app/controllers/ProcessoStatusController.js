"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _ProcessoServico = require('../models/ProcessoServico'); var _ProcessoServico2 = _interopRequireDefault(_ProcessoServico);
var _ProcessoStatus = require('../models/ProcessoStatus'); var _ProcessoStatus2 = _interopRequireDefault(_ProcessoStatus);
var _Processo = require('../models/Processo'); var _Processo2 = _interopRequireDefault(_Processo);
var _Servico = require('../models/Servico'); var _Servico2 = _interopRequireDefault(_Servico);
var _Cliente = require('../models/Cliente'); var _Cliente2 = _interopRequireDefault(_Cliente);
var _Colaborador = require('../models/Colaborador'); var _Colaborador2 = _interopRequireDefault(_Colaborador);
var _EmpresaExterior = require('../models/EmpresaExterior'); var _EmpresaExterior2 = _interopRequireDefault(_EmpresaExterior);
var _Mail = require('../../lib/Mail'); var _Mail2 = _interopRequireDefault(_Mail);

class ProcessoStatusController {
  async store(req, res) {
    const schema = Yup.object().shape({
      processo_servico_id: Yup.number().required(),
      descricao_status: Yup.string().required(),
      notifica_cliente: Yup.boolean().required(),
      exibe_cliente: Yup.boolean().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails.' });
    }

    const processo_servico_Existe = await _ProcessoServico2.default.findOne({
      where: { id: req.body.processo_servico_id },
    });

    if (!processo_servico_Existe) {
      return res.status(400).json({ error: 'Processo Serviço não existe.' });
    }

    const {
      id,
      processo_servico_id,
      descricao_status,
      notifica_cliente,
      exibe_cliente,
    } = await _ProcessoStatus2.default.create(req.body);

    /* Método para envio de email ao inserir um novo status */
    const clienteEmail = await _ProcessoServico2.default.findByPk(
      req.body.processo_servico_id,
      {
        include: [
          {
            model: _Processo2.default,
            as: 'processo',
            include: [
              {
                model: _Cliente2.default,
                as: 'cliente',
                attributes: ['nome', 'email', 'envio_email'],
              },
            ],
          },
        ],
      }
    );

    if (
      clienteEmail.processo.cliente.envio_email === 1 &&
      req.body.notifica_cliente === true
    ) {
      await _Mail2.default.sendMail({
        to: `${clienteEmail.processo.cliente.nome} <${clienteEmail.processo.cliente.email}>`,
        subject: 'Atualização de Status do Processo',
        template: 'atualizacaoStatus',
        context: {
          nome: clienteEmail.processo.cliente.nome,
          processo: clienteEmail.processo.referencia,
          descricao_status: req.body.descricao_status,
        },
      });
    }

    return res.json({
      id,
      processo_servico_id,
      descricao_status,
      notifica_cliente,
      exibe_cliente,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
      processo_servico_id: Yup.number().required(),
      descricao_status: Yup.string().required(),
      notifica_cliente: Yup.boolean().required(),
      exibe_cliente: Yup.boolean().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails.' });
    }

    const { id } = req.body;

    const processostatus = await _ProcessoStatus2.default.findByPk(req.body.id);

    if (id !== processostatus.id) {
      return res.status(400).json({ error: 'Processo Status não existente.' });
    }

    const processo_Servico_Existe = await _ProcessoServico2.default.findOne({
      where: { id: req.body.processo_servico_id },
    });

    if (!processo_Servico_Existe) {
      return res.status(400).json({ error: 'Processo Serviço não existe.' });
    }

    const {
      processo_servico_id,
      descricao_status,
      notifica_cliente,
      exibe_cliente,
    } = await processostatus.update(req.body);

    return res.json({
      id,
      processo_servico_id,
      descricao_status,
      notifica_cliente,
      exibe_cliente,
    });
  }

  async index(req, res) {
    const processoStatus = await _ProcessoStatus2.default.findAll({
      attributes: [
        'id',
        'processo_servico_id',
        'descricao_status',
        'notifica_cliente',
        'exibe_cliente',
        'created_at',
        'updated_at',
      ],
      include: [
        {
          model: _ProcessoServico2.default,
          as: 'processo_Servico',
          attributes: ['id', 'numero_registro', 'processo_id', 'servico_id'],
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
        },
      ],
    });

    return res.json(processoStatus);
  }

  async getStatusDoProcesso(req, res) {
    const status = await _ProcessoStatus2.default.findAll({
      attributes: [
        'id',
        'processo_servico_id',
        'descricao_status',
        'notifica_cliente',
        'exibe_cliente',
        'created_at',
        'updated_at',
      ],

      include: [
        {
          model: _ProcessoServico2.default,
          as: 'processo_Servico',
          where: { processo_id: req.query.idProcesso },
          attributes: ['id', 'processo_id'],

          include: [
            {
              model: _Servico2.default,
              as: 'servico',
              attributes: ['id', 'nome_servico'],
            },
          ],
        },
      ],
    });
    return res.json(status);
  }

  async getUltimosStatusDoProcesso(req, res) {
    const processoStatus = await _ProcessoStatus2.default.findAll({
      attributes: [
        'id',
        'processo_servico_id',
        'descricao_status',
        'notifica_cliente',
        'exibe_cliente',
        'created_at',
        'updated_at',
      ],
      include: [
        {
          model: _ProcessoServico2.default,
          as: 'processo_Servico',
          attributes: ['id', 'numero_registro', 'processo_id', 'servico_id'],
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
        },
      ],
    });

    return res.json(processoStatus);
  }

  async getStatusNaoExibidosParaOCliente(req, res) {
    const listStatus = await _ProcessoStatus2.default.findAll({
      where: { notifica_cliente: 1 },
      attributes: [
        'id',
        'processo_servico_id',
        'descricao_status',
        'notifica_cliente',
        'exibe_cliente',
        'created_at',
        'updated_at',
      ],
      include: [
        {
          model: _ProcessoServico2.default,
          as: 'processo_Servico',
          // where: { processo_id: req.query.idCliente },
          attributes: ['id', 'processo_id'],
          include: [
            {
              model: _Processo2.default,
              as: 'processo',
              attributes: ['referencia', 'id', 'cliente_id'],
              // where: {cliente_id: req.query.idCliente}
            },
            {
              model: _Servico2.default,
              as: 'servico',
              attributes: ['id', 'nome_servico'],
            },
          ],
        },
      ],
    });

    return res.json(listStatus);
  }

  async getStatusProcesso(req, res) {
    const processoStatus = await _ProcessoStatus2.default.findAll({
      attributes: [
        'id',
        'processo_servico_id',
        'descricao_status',
        'notifica_cliente',
        'exibe_cliente',
        'created_at',
        'updated_at',
      ],
      include: [
        {
          model: _ProcessoServico2.default,
          as: 'processo_Servico',
          where: { processo_id: req.params.processoId },
          attributes: ['id', 'numero_registro', 'processo_id', 'servico_id'],
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
        },
      ],
    });

    return res.json(processoStatus);
  }
}

exports. default = new ProcessoStatusController();
