import * as Yup from 'yup';
import Parametros from '../models/Parametros';

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

    const login = await Parametros.findOne({
      where: { login: req.body.login },
    });

    const cpf_cnpj_Existe = await Parametros.findOne({
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
    } = await Parametros.create(obj);

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
    const parametros = await Parametros.findAll({
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
    const parametros = await Parametros.findAll({
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

export default new ParametrosController();
