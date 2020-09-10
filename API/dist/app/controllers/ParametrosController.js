"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _Parametros = require('../models/Parametros'); var _Parametros2 = _interopRequireDefault(_Parametros);

class ParametrosController {
  async store(req, res) {
    const schema = Yup.object().shape({
      nome_empresa: Yup.string().required(),
      cpf_cnpj: Yup.string().required(),
      login: Yup.string().email().required(),
      senha: Yup.string().required().min(6),
    });

    const obj = {
      nome_empresa: req.body.nome_empresa,
      nome_logo: req.file.originalname,
      logo_path: req.file.filename,
      cpf_cnpj: req.body.cpf_cnpj,
      login: req.body.login,
      senha: req.body.senha,
    };

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails.' });
    }

    const login = await _Parametros2.default.findOne({
      where: { login: req.body.login },
    });

    const cpf_cnpj_Existe = await _Parametros2.default.findOne({
      where: { cpf_cnpj: req.body.cpf_cnpj },
    });

    if (login) {
      return res.status(400).json({ error: 'Login da Empresa já cadastrado.' });
    }

    if (cpf_cnpj_Existe) {
      return res
        .status(400)
        .json({ error: 'CPF ou CNPJ da Empresa já cadastrado.' });
    }

    const {
      id,
      nome_empresa,
      nome_logo,
      logo_path,
      cpf_cnpj,
      ativo,
    } = await _Parametros2.default.create(obj);

    return res.json({
      id,
      nome_empresa,
      nome_logo,
      logo_path,
      cpf_cnpj,
      login,
      ativo,
    });
  }

  async index(req, res) {
    const parametros = await _Parametros2.default.findAll({
      attributes: [
        'id',
        'nome_empresa',
        'nome_logo',
        'logo_path',
        'url',
        'cpf_cnpj',
        'login',
        'ativo',
        'created_at',
        'updated_at',
      ],
    });

    return res.json(parametros);
  }

  async getParametrosAtivos(req, res) {
    const parametros = await _Parametros2.default.findAll({
      where: { ativo: 1 },
      attributes: [
        'id',
        'nome_empresa',
        'nome_logo',
        'logo_path',
        'url',
        'cpf_cnpj',
        'login',
        'ativo',
        'created_at',
        'updated_at',
      ],
    });

    return res.json(parametros);
  }
}

exports. default = new ParametrosController();
