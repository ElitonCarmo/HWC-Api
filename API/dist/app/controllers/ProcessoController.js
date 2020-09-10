"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _Processo = require('../models/Processo'); var _Processo2 = _interopRequireDefault(_Processo);
var _Cliente = require('../models/Cliente'); var _Cliente2 = _interopRequireDefault(_Cliente);
var _Colaborador = require('../models/Colaborador'); var _Colaborador2 = _interopRequireDefault(_Colaborador);
var _EmpresaExterior = require('../models/EmpresaExterior'); var _EmpresaExterior2 = _interopRequireDefault(_EmpresaExterior);

class ProcessoController {
  async store(req, res) {
    const schema = Yup.object().shape({
      tipo_operacao: Yup.string().required(),
      referencia: Yup.string().required(),
      mercadoria: Yup.string().required(),
      cliente_id: Yup.number().required(),
      empresaexterior_id: Yup.number().required(),
      colaborador_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails.' });
    }

    const cliente_Existe = await _Cliente2.default.findOne({
      where: { id: req.body.cliente_id },
    });

    const empresa_Existe = await _EmpresaExterior2.default.findOne({
      where: { id: req.body.empresaexterior_id },
    });

    /* const cliente_Exportador = await Cliente.findOne({
      where: { tipo: 'Importador', id: req.body.cliente_id },
    });

    const cliente_Importador = await Cliente.findOne({
      where: { tipo: 'Exportador', id: req.body.cliente_id },
    }); */

    const colaborador_Existe = await _Colaborador2.default.findOne({
      where: { id: req.body.colaborador_id },
    });

    if (!empresa_Existe) {
      return res.status(400).json({ error: 'Empresa não existe.' });
    }

    if (!colaborador_Existe) {
      return res.status(400).json({ error: 'colaborador não existe.' });
    }

    if (!cliente_Existe) {
      return res.status(400).json({ error: 'Cliente não existe.' });
    }

    if (cliente_Existe.tipo !== 'Exportador e Importador') {
      if (
        req.body.tipo_operacao === 'Exportacao' &&
        cliente_Existe.tipo !== 'Exportador'
      ) {
        return res.status(400).json({
          error:
            'Cliente não está habilitado a realizar esse tipo de Operação.',
        });
      }

      if (
        req.body.tipo_operacao === 'Importacao' &&
        cliente_Existe.tipo !== 'Importador'
      ) {
        return res.status(400).json({
          error:
            'Cliente não está habilitado a realizar esse tipo de Operação.',
        });
      }
    }

    /*
    if (cliente_Exportador) {
      return res
        .status(400)
        .json({ error: 'Cliente selecionado não é exportador.' });
    }

    if (cliente_Importador) {
      return res
        .status(400)
        .json({ error: 'Cliente selecionado não é importador.' });
    }
  */
    const {
      id,
      tipo_operacao,
      referencia,
      mercadoria,
      cliente_id,
      empresaexterior_id,
      colaborador_id,
    } = await _Processo2.default.create(req.body);

    return res.json({
      id,
      tipo_operacao,
      referencia,
      mercadoria,
      cliente_id,
      empresaexterior_id,
      colaborador_id,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
      tipo_operacao: Yup.string().required(),
      referencia: Yup.string().required(),
      mercadoria: Yup.string().required(),
      cliente_id: Yup.number().required(),
      empresaexterior_id: Yup.number().required(),
      colaborador_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails.' });
    }

    const { id } = req.body;

    const processo = await _Processo2.default.findByPk(req.body.id);

    if (id !== processo.id) {
      return res.status(400).json({ error: 'Processo não existente.' });
    }

    const cliente_Existe = await _Cliente2.default.findOne({
      where: { id: req.body.cliente_id },
    });

    const empresa_Existe = await _EmpresaExterior2.default.findOne({
      where: { id: req.body.empresaexterior_id },
    });

    /* const cliente_Exportador = await Cliente.findOne({
      where: { tipo: 'Importador', id: req.body.cliente_id },
    });

    const cliente_Importador = await Cliente.findOne({
      where: { tipo: 'Exportador', id: req.body.cliente_id },
    }); */

    const colaborador_Existe = await _Colaborador2.default.findOne({
      where: { id: req.body.colaborador_id },
    });

    if (!cliente_Existe) {
      return res.status(400).json({ error: 'Cliente não existe.' });
    }

    if (!empresa_Existe) {
      return res.status(400).json({ error: 'Empresa não existe.' });
    }

    if (!colaborador_Existe) {
      return res.status(400).json({ error: 'colaborador não existe.' });
    }

    /*
    if (cliente_Exportador) {
      return res
        .status(400)
        .json({ error: 'Cliente selecionado não é exportador.' });
    }

    if (cliente_Importador) {
      return res
        .status(400)
        .json({ error: 'Cliente selecionado não é importador.' });
    }
    */

    if (!cliente_Existe) {
      return res.status(400).json({ error: 'Cliente não existe.' });
    }

    if (cliente_Existe.tipo !== 'Exportador e Importador') {
      if (
        req.body.tipo_operacao === 'Exportacao' &&
        cliente_Existe.tipo !== 'Exportador'
      ) {
        return res.status(400).json({
          error:
            'Cliente não está habilitado a realizar esse tipo de Operação.',
        });
      }

      if (
        req.body.tipo_operacao === 'Importacao' &&
        cliente_Existe.tipo !== 'Importador'
      ) {
        return res.status(400).json({
          error:
            'Cliente não está habilitado a realizar esse tipo de Operação.',
        });
      }
    }

    const {
      tipo_operacao,
      referencia,
      mercadoria,
      cliente_id,
      empresaexterior_id,
      colaborador_id,
    } = await processo.update(req.body);

    return res.json({
      id,
      tipo_operacao,
      referencia,
      mercadoria,
      cliente_id,
      empresaexterior_id,
      colaborador_id,
    });
  }

  async index(req, res) {
    const processo = await _Processo2.default.findAll({
      attributes: [
        'id',
        'tipo_operacao',
        'referencia',
        'mercadoria',
        'cliente_id',
        'empresaexterior_id',
        'colaborador_id',
        'created_at',
        'updated_at',
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
    });

    return res.json(processo);
  }

  async getProcessosPorClienteId(req, res) {

    const processo = await _Processo2.default.findAll({
      where: { cliente_id: req.params.idCliente },
      order: [['created_at']],
      attributes: [
        'id',
        'tipo_operacao',
        'referencia',
        'mercadoria',
        'cliente_id',
        'empresaexterior_id',
        'colaborador_id',
        'created_at',
        'updated_at',
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
    });

    return res.json(processo);
  }

  async getProcessosCliente(req, res) {
    const processo = await _Processo2.default.findAll({
      where: { cliente_id: req.LoginId },
      order: ['created_at'],
      attributes: [
        'id',
        'tipo_operacao',
        'referencia',
        'mercadoria',
        'cliente_id',
        'empresaexterior_id',
        'colaborador_id',
        'created_at',
        'updated_at',
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
    });

    return res.json(processo);
  }

  async getProcessosColaborador(req, res) {
    const processo = await _Processo2.default.findAll({
      where: { colaborador_id: req.LoginId },
      order: ['created_at'],
      attributes: [
        'id',
        'tipo_operacao',
        'referencia',
        'mercadoria',
        'cliente_id',
        'empresaexterior_id',
        'colaborador_id',
        'created_at',
        'updated_at',
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
    });

    return res.json(processo);
  }
}

exports. default = new ProcessoController();
