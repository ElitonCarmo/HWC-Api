import * as Yup from 'yup';
import { Op } from 'sequelize';
import ProcessoServico from '../models/ProcessoServico';
import Processo from '../models/Processo';
import Servico from '../models/Servico';
import Cliente from '../models/Cliente';
import Colaborador from '../models/Colaborador';
import EmpresaExterior from '../models/EmpresaExterior';

class ProcessoServicoController {
  async store(req, res) {
    const schema = Yup.object().shape({
      processo_id: Yup.number().required(),
      servico_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails.' });
    }

    const processo_Existe = await Processo.findOne({
      where: { id: req.body.processo_id },
    });

    const servico_Existe = await Servico.findOne({
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
    } = await ProcessoServico.create(req.body);

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

    const processoservico = await ProcessoServico.findByPk(req.body.id);

    if (id !== processoservico.id) {
      return res.status(400).json({ error: 'Processo Serviço não existente.' });
    }

    const processo_Existe = await Processo.findOne({
      where: { id: req.body.processo_id },
    });

    const servico_Existe = await Servico.findOne({
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
    const processoServico = await ProcessoServico.findAll({
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
          model: Processo,
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
              model: Cliente,
              as: 'cliente',
              attributes: ['id', 'nome'],
            },
            {
              model: EmpresaExterior,
              as: 'empresa',
              attributes: ['id', 'nome'],
            },
            {
              model: Colaborador,
              as: 'colaborador',
              attributes: ['id', 'nome'],
            },
          ],
        },
        {
          model: Servico,
          as: 'servico',
          attributes: ['id', 'nome_servico'],
        },
      ],
    });

    return res.json(processoServico);
  }

  async getTotalServicos(req, res) {
    const total = await ProcessoServico.count({
      where: { servico_id: req.params.id, numero_registro: { [Op.ne]: '' } },      
    });

    return res.json(total+1);
  }

  async getServicosDoProcesso(req, res) {
    const servico = await ProcessoServico.findAll({
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

export default new ProcessoServicoController();
