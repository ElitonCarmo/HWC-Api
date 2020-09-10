"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _Cliente = require('../models/Cliente'); var _Cliente2 = _interopRequireDefault(_Cliente);

class ClienteController {
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

    const emailExiste = await _Cliente2.default.findOne({
      where: { email: req.body.email },
    });

    const cpf_cnpj_Existe = await _Cliente2.default.findOne({
      where: { cpf_cnpj: req.body.cpf_cnpj },
    });

    if (emailExiste) {
      return res
        .status(400)
        .json({ error: 'E-mail do cliente já cadastrado.' });
    }

    if (cpf_cnpj_Existe) {
      return res
        .status(400)
        .json({ error: 'CPF ou CNPJ do cliente já cadastrado.' });
    }
    // Retornar objeto completo da tabela
    // const cliente = await Cliente.create(req.body);

    // return res.json(cliente);

    // Retornar apenas os campos necessários da tabela

    const {
      id,
      nome,
      nome_logo,
      logo_path,
      cpf_cnpj,
      email,
      envio_email,
      ativo,
      tipo,
    } = await _Cliente2.default.create(obj);

    return res.json({
      id,
      nome,
      nome_logo,
      logo_path,
      cpf_cnpj,
      email,
      envio_email,
      ativo,
      tipo,
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
        ativo: req.body.ativo,
        envio_email: req.body.envio_Email,
      };
    } else {
      obj = {
        nome: req.body.nome,
        nome_logo: req.file.originalname,
        logo_path: req.file.filename,
        cpf_cnpj: req.body.cpf_cnpj,
        email: req.body.email,
        tipo: req.body.tipo,
        ativo: req.body.ativo,
        envio_email: req.body.envio_Email,
      };
    }

    if (req.body.alterarSenha) obj.senha = req.body.senha;

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails.' });
    }

    const { email, cpf_cnpj } = req.body;

    const cliente = await _Cliente2.default.findByPk(req.body.id);

    if (email !== cliente.email || cpf_cnpj !== cliente.cpf_cnpj) {
      const emailExiste = await _Cliente2.default.findOne({ where: { email } });

      const cpf_cnpj_existe = await _Cliente2.default.findOne({ where: { email } });

      if (emailExiste) {
        return res.status(400).json({ error: 'E-mail já existente.' });
      }

      if (cpf_cnpj_existe) {
        return res.status(400).json({ error: 'CPF ou CNPJ já existente.' });
      }
    }

    const {
      id,
      nome,
      nome_logo,
      logo_path,
      ativo,
      envio_email,
      tipo,
    } = await cliente.update(obj);

    return res.json({
      id,
      nome,
      nome_logo,
      logo_path,
      cpf_cnpj,
      email,
      envio_email,
      ativo,
      tipo,
    });
  }

  async alterarConfiguracoes(req, res) {
    const obj = {
      envio_email: req.body.envio_email,
    };

    if (req.body.alterarSenha) obj.senha = req.body.senha;

    const cliente = await _Cliente2.default.findByPk(req.body.id);

    const { id } = await cliente.update(obj);

    return res.json({
      id,
    });
  }

  async index(req, res) {
    const clientes = await _Cliente2.default.findAll({
      attributes: [
        'id',
        'nome',
        'nome_logo',
        'logo_path',
        'cpf_cnpj',
        'email',
        'envio_email',
        'ativo',
        'tipo',
        'created_at',
        'updated_at',
      ],
    });

    return res.json(clientes);
  }

  async getClientesAtivos(req, res) {
    const clientes = await _Cliente2.default.findAll({
      where: { ativo: 1 },
      attributes: [
        'id',
        'nome',
        'nome_logo',
        'logo_path',
        'cpf_cnpj',
        'email',
        'envio_email',
        'ativo',
        'tipo',
        'created_at',
        'updated_at',
      ],
    });

    return res.json(clientes);
  }

  async getClientePorCodigo(req, res) {
    /*
    const clientes = await Cliente.findAll({
      where: { id: req.params.id },
      attributes: [
        'id',
        'nome',
        'nome_logo',
        'logo_path',
        'cpf_cnpj',
        'email',
        'envio_email',
        'ativo',
        'tipo',
        'created_at',
        'updated_at',
      ],
    });
    */

    const cliente = await _Cliente2.default.findByPk(req.params.id);

    return res.json(cliente);
  }

  async putRemoveImagemCliente(req, res) {
    const obj = {
      nome_logo: null,
      logo_path: null,
    };

    const cliente = await _Cliente2.default.findByPk(req.params.clienteId);

    const { id, nome, nome_logo, logo_path } = await cliente.update(obj);

    return res.json({
      id,
      nome,
      nome_logo,
      logo_path,
    });
  }
}

exports. default = new ClienteController();
