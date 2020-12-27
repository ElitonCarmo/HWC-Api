import * as Yup from 'yup';
import EmpresaExterior from '../models/EmpresaExterior';

class EmpresaExteriorController {
  async store(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails.' });
    }

    const empresa_Existe = await EmpresaExterior.findOne({
      where: { nome: req.body.nome },
    });

    if (empresa_Existe) {
      return res.status(400).json({ error: 'Empresa já existente.' });
    }

    const { id, nome, nif, ativo } = await EmpresaExterior.create(req.body);

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

    const empresaexterior = await EmpresaExterior.findByPk(req.body.id);

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
    const empresaexterior = await EmpresaExterior.findAll({
      attributes: ['id', 'nome', 'nif', 'ativo', 'created_at', 'updated_at'],
    });

    return res.json(empresaexterior);
  }

  async getEmpresasAtivas(req, res) {
    const empresaexterior = await EmpresaExterior.findAll({
      where: { ativo: 1 },
      attributes: ['id', 'nome', 'nif', 'ativo', 'created_at', 'updated_at'],
    });

    return res.json(empresaexterior);
  }
}

export default new EmpresaExteriorController();
