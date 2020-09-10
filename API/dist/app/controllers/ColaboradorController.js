"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _sequelize = require('sequelize');
var _Colaborador = require('../models/Colaborador'); var _Colaborador2 = _interopRequireDefault(_Colaborador);

class ColaboradorController {
  async store(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      cpf_cnpj: Yup.string().required(),
      email: Yup.string().email().required(),
      senha: Yup.string().required().min(6),
      tipo: Yup.string().required(),
    });

    let obj;

    if (typeof req.file === 'undefined') {
      obj = {
        nome: req.body.nome,
        nome_logo: null,
        logo_path: null,
        cpf_cnpj: req.body.cpf_cnpj,
        email: req.body.email,
        senha: req.body.senha,
        tipo: req.body.tipo,
      };
    } else {
      obj = {
        nome: req.body.nome,
        nome_logo: req.file.originalname,
        logo_path: req.file.filename,
        cpf_cnpj: req.body.cpf_cnpj,
        email: req.body.email,
        senha: req.body.senha,
        tipo: req.body.tipo,
      };
    }

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails.' });
    }

    const emailExiste = await _Colaborador2.default.findOne({
      where: { email: req.body.email },
    });

    const cpf_cnpj_Existe = await _Colaborador2.default.findOne({
      where: { cpf_cnpj: req.body.cpf_cnpj },
    });

    if (emailExiste) {
      return res
        .status(400)
        .json({ error: 'E-mail do Colaborador já cadastrado.' });
    }

    if (cpf_cnpj_Existe) {
      return res
        .status(400)
        .json({ error: 'CPF ou CNPJ do Colaborador já cadastrado.' });
    }

    const {
      id,
      nome,
      nome_logo,
      logo_path,
      cpf_cnpj,
      email,
      ativo,
    } = await _Colaborador2.default.create(obj);

    return res.json({
      id,
      nome,
      nome_logo,
      logo_path,
      cpf_cnpj,
      email,
      ativo,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string(),
      email: Yup.string().email(),
      cpf_cnpj: Yup.string(),
      tipo: Yup.string(),
    });

    let obj;

    if (typeof req.file === 'undefined') {
      obj = {
        nome: req.body.nome,
        nome_logo: null,
        logo_path: null,
        cpf_cnpj: req.body.cpf_cnpj,
        email: req.body.email,
        tipo: req.body.tipo,
      };
    } else {
      obj = {
        nome: req.body.nome,
        nome_logo: req.file.originalname,
        logo_path: req.file.filename,
        cpf_cnpj: req.body.cpf_cnpj,
        email: req.body.email,
        tipo: req.body.tipo,
      };
    }

    if (req.body.alterarSenha) obj.senha = req.body.senha;

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails.' });
    }

    const { email, cpf_cnpj } = req.body;

    const colaborador = await _Colaborador2.default.findByPk(req.body.id);

    if (email !== colaborador.email || cpf_cnpj !== colaborador.cpf_cnpj) {
      const emailExiste = await _Colaborador2.default.findOne({
        where: {
          email,
          [_sequelize.Op.not]: [{ id: req.body.id }],
        },
      });

      const cpf_cnpj_existe = await _Colaborador2.default.findOne({
        where: { cpf_cnpj, [_sequelize.Op.not]: [{ id: req.body.id }] },
      });

      if (emailExiste) {
        return res.status(400).json({ error: 'E-mail já existente.' });
      }

      if (cpf_cnpj_existe) {
        return res.status(400).json({ error: 'CPF ou CNPJ já existente.' });
      }
    }

    const { id, nome_logo, logo_path, nome, ativo } = await colaborador.update(
      obj
    );

    return res.json({
      id,
      nome,
      nome_logo,
      logo_path,
      cpf_cnpj,
      email,
      ativo,
    });
  }

  async alterarConfiguracoes(req, res) {
    const obj = {
      senha: req.body.senha,
    };

    const colaborador = await _Colaborador2.default.findByPk(req.body.id);

    const { id } = await colaborador.update(obj);

    return res.json({
      id,
    });
  }

  async index(req, res) {
    const colaboradores = await _Colaborador2.default.findAll({
      attributes: [
        'id',
        'nome',
        'nome_logo',
        'logo_path',
        'cpf_cnpj',
        'email',
        'ativo',
        'tipo',
        'created_at',
        'updated_at',
      ],
    });

    return res.json(colaboradores);
  }

  async getColaboradoresAtivos(req, res) {
    const colaboradores = await _Colaborador2.default.findAll({
      where: { ativo: 1 },
      attributes: [
        'id',
        'nome',
        'nome_logo',
        'logo_path',
        'cpf_cnpj',
        'email',
        'ativo',
        'created_at',
        'updated_at',
      ],
    });

    return res.json(colaboradores);
  }

  async putRemoveImagemColaborador(req, res) {
    const obj = {
      nome_logo: null,
      logo_path: null,
    };

    const colaborador = await _Colaborador2.default.findByPk(req.params.colaboradorId);

    const { id, nome, nome_logo, logo_path } = await colaborador.update(obj);

    return res.json({
      id,
      nome,
      nome_logo,
      logo_path,
    });
  }
}

exports. default = new ColaboradorController();
