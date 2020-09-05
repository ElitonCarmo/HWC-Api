import * as Yup from 'yup';
import ProcessoServico from '../models/ProcessoServico';
import ProcessoStatus from '../models/ProcessoStatus';
import Processo from '../models/Processo';
import Servico from '../models/Servico';
import Cliente from '../models/Cliente';
import Colaborador from '../models/Colaborador';
import EmpresaExterior from '../models/EmpresaExterior';
import Mail from '../../lib/Mail';

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

    const processo_servico_Existe = await ProcessoServico.findOne({
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
    } = await ProcessoStatus.create(req.body);

    /* Método para envio de email ao inserir um novo status */
    const clienteEmail = await ProcessoServico.findByPk(
      req.body.processo_servico_id,
      {
        include: [
          {
            model: Processo,
            as: 'processo',
            include: [
              {
                model: Cliente,
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
      await Mail.sendMail({
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

    const processostatus = await ProcessoStatus.findByPk(req.body.id);

    if (id !== processostatus.id) {
      return res.status(400).json({ error: 'Processo Status não existente.' });
    }

    const processo_Servico_Existe = await ProcessoServico.findOne({
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
    const processoStatus = await ProcessoStatus.findAll({
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
          model: ProcessoServico,
          as: 'processo_Servico',
          attributes: ['id', 'numero_registro', 'processo_id', 'servico_id'],
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
        },
      ],
    });

    return res.json(processoStatus);
  }



  async getStatusDoProcesso(req, res) {
    const status = await ProcessoStatus.findAll({
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
          model: ProcessoServico,
          as: 'processo_Servico',
          where: { processo_id: req.query.idProcesso },
          attributes: ['id', 'processo_id'],
          
            include:[
              {
                model: Servico,
                as: 'servico',
                where: {id, nome_servico}
              }
            ],
        },
      ],
    });

    return res.json(status);
  }

  async getUltimosStatusDoProcesso(req, res) {
    const processoStatus = await ProcessoStatus.findAll({
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
          model: ProcessoServico,
          as: 'processo_Servico',
          attributes: ['id', 'numero_registro', 'processo_id', 'servico_id'],
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
        },
      ],
    });

    return res.json(processoStatus);
  }

  async getStatusNaoExibidosParaOCliente(req, res) {

    let listStatus = await ProcessoStatus.findAll({
      where:{notifica_cliente:1},
      attributes: [
        'id', 
        'processo_servico_id', 
        'descricao_status', 
        'notifica_cliente', 
        'exibe_cliente', 
        'created_at', 
        'updated_at'
      ],
      include: [
        {
          model: ProcessoServico,
          as: 'processo_Servico',
          //where: { processo_id: req.query.idCliente },
          attributes: ['id', 'processo_id'],
          include:[
            {
              model: Processo,
              as: 'processo',
              attributes: ['referencia','id', 'cliente_id'],
              //where: {cliente_id: req.query.idCliente}
            },
            {
              model:Servico,
              as: 'servico',
              attributes: ['id', 'nome_servico']
            }
          ],
          
        }
      ]

    });
     
    
    return res.json(listStatus);
  }




  
  async getStatusProcesso(req, res) {
    const processoStatus = await ProcessoStatus.findAll({
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
          model: ProcessoServico,
          as: 'processo_Servico',
          where: { processo_id: req.params.processoId },
          attributes: ['id', 'numero_registro', 'processo_id', 'servico_id'],
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
        },
      ],
    });

    return res.json(processoStatus);
  }
  
}

export default new ProcessoStatusController();
