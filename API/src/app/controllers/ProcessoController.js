import * as Yup from 'yup';
import Processo from '../models/Processo';
import Cliente from '../models/Cliente';
import Colaborador from '../models/Colaborador';
import EmpresaExterior from '../models/EmpresaExterior';

// processoFinalizado

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

    const cliente_Existe = await Cliente.findOne({
      where: { id: req.body.cliente_id },
    });

    const empresa_Existe = await EmpresaExterior.findOne({
      where: { id: req.body.empresaexterior_id },
    });

    /* const cliente_Exportador = await Cliente.findOne({
      where: { tipo: 'Importador', id: req.body.cliente_id },
    });

    const cliente_Importador = await Cliente.findOne({
      where: { tipo: 'Exportador', id: req.body.cliente_id },
    }); */

    const colaborador_Existe = await Colaborador.findOne({
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

    console.log('Bruno');
    console.log(req.body);

    const {
      id,
      tipo_operacao,
      referencia,
      mercadoria,
      cliente_id,
      empresaexterior_id,
      colaborador_id,
      processofinalizado
    } = await Processo.create(req.body);

    return res.json({
      id,
      tipo_operacao,
      referencia,
      mercadoria,
      cliente_id,
      empresaexterior_id,
      colaborador_id,
      processofinalizado
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

    const processo = await Processo.findByPk(req.body.id);

    if (id !== processo.id) {
      return res.status(400).json({ error: 'Processo não existente.' });
    }

    const cliente_Existe = await Cliente.findOne({
      where: { id: req.body.cliente_id },
    });

    const empresa_Existe = await EmpresaExterior.findOne({
      where: { id: req.body.empresaexterior_id },
    });

    /* const cliente_Exportador = await Cliente.findOne({
      where: { tipo: 'Importador', id: req.body.cliente_id },
    });

    const cliente_Importador = await Cliente.findOne({
      where: { tipo: 'Exportador', id: req.body.cliente_id },
    }); */

    const colaborador_Existe = await Colaborador.findOne({
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

    
    console.log('Bruno');
    console.log(req.body);

    const {
      tipo_operacao,
      referencia,
      mercadoria,
      cliente_id,
      empresaexterior_id,
      colaborador_id,
      processofinalizado
    } = await processo.update(req.body);

    return res.json({
      id,
      tipo_operacao,
      referencia,
      mercadoria,
      cliente_id,
      empresaexterior_id,
      colaborador_id,
      processofinalizado
    });
  }

  async index(req, res) {
    const processo = await Processo.findAll({
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
        'processofinalizado'
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
    });

    return res.json(processo);
  }

  async getProcessosPorClienteId(req, res) {

    const processo = await Processo.findAll({
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
        'processofinalizado'
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
    });

    return res.json(processo);
  }

  async getProcessosCliente(req, res) {
    const processo = await Processo.findAll({
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
        'processofinalizado'
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
    });

    return res.json(processo);
  }

  async getProcessosColaborador(req, res) {
    const processo = await Processo.findAll({
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
        'processofinalizado'
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
    });

    return res.json(processo);
  }
}

export default new ProcessoController();
