import * as Yup from 'yup';
import Servico from '../models/Servico';

class ServicoController {
  async store(req, res) {
    const schema = Yup.object().shape({
      nome_servico: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails.' });
    }

    const servico_Existe = await Servico.findOne({
      where: { nome_servico: req.body.nome_servico },
    });

    if (servico_Existe) {
      return res.status(400).json({ error: 'Serviço já existente.' });
    }

    const { id, nome_servico, ativo } = await Servico.create(req.body);

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

    const servico = await Servico.findByPk(req.body.id);

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
    const servico = await Servico.findAll({
      attributes: ['id', 'nome_servico', 'ativo', 'created_at', 'updated_at'],
    });

    return res.json(servico);
  }

  async getServicosAtivos(req, res) {
    const servico = await Servico.findAll({
      where: { ativo: 1 },
      attributes: ['id', 'nome_servico', 'ativo', 'created_at', 'updated_at'],
    });

    return res.json(servico);
  }
}

export default new ServicoController();
