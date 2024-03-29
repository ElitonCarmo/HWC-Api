import * as Yup from 'yup';
import Cliente from '../models/Cliente';
import ClienteContato from '../models/ClienteContato';

class ClienteController {
  async store(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      cpf_cnpj: Yup.string().required(),
      //email: Yup.string().email().required(),
      //senha: Yup.string().required().min(6),
      tipo: Yup.string().required(),
    });

    let obj;

    if (typeof req.file === 'undefined') {
      obj = {
        nome: req.body.nome,
        nome_logo: null,
        logo_path: null,
        cpf_cnpj: req.body.cpf_cnpj,
        //email: req.body.email,
        //senha: req.body.senha,
        tipo: req.body.tipo,
      };
    } else {
      obj = {
        nome: req.body.nome,
        nome_logo: req.file.originalname,
        logo_path: req.file.filename,
        cpf_cnpj: req.body.cpf_cnpj,
        //email: req.body.email,
        //senha: req.body.senha,
        tipo: req.body.tipo,
      };
    }

    console.log('Bruno Teste 1 ');

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails.' });
    }

    console.log('Bruno Teste 2 ');
    /*
    const emailExiste = await Cliente.findOne({
      where: { email: req.body.email },
    });
    */

    const cpf_cnpj_Existe = await Cliente.findOne({
      where: { cpf_cnpj: req.body.cpf_cnpj },
    });

    console.log('Bruno Teste 3 ');
    /*
    if (emailExiste) {
      return res
        .status(400)
        .json({ error: 'E-mail do cliente já cadastrado.' });
    }
  */

    if (cpf_cnpj_Existe) {
      return res
        .status(400)
        .json({ error: 'CPF ou CNPJ do cliente já cadastrado.' });
    }

    
    console.log('Bruno Teste 4 ');
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
    } = await Cliente.create(obj);

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
      //email: Yup.string().email(),
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

    const cliente = await Cliente.findByPk(req.body.id);

    if (email !== cliente.email || cpf_cnpj !== cliente.cpf_cnpj) {
      const emailExiste = await Cliente.findOne({ where: { email } });

      const cpf_cnpj_existe = await Cliente.findOne({ where: { email } });

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


  async updateIdCelularCliente(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number(),
      id_celular: Yup.string(),
      email: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails.' });
    }

    const { id, email } = req.body;

    const cliente = await ClienteContato.findOne({
      where: { email: req.body.email, cliente_id: req.body.id },
    });

    if(cliente)
      await cliente.update({id_celular: req.body.id_celular});

    return res.json({
      id,
      id_celular,
    });
  }

  async alterarConfiguracoes(req, res) {
    const obj = {
      envio_email: req.body.envio_email,
      email: req.body.email
    };

    if (req.body.alterarSenha) obj.senha = req.body.senha;

    //const clienteContato = await ClienteContato.findOne(req.body.id);
    const clienteContato = await ClienteContato.findOne({
      where: { email: req.body.email, cliente_id: req.body.id },
    });

    const { id } = await clienteContato.update(obj);

    return res.json({
      id,
    });
  }

  async index(req, res) {
    const clientes = await Cliente.findAll({
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
        'id_celular',
      ],
    });

    return res.json(clientes);
  }

  async getClientesAtivos(req, res) {
    const clientes = await Cliente.findAll({
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
        'id_celular',
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

    //const cliente = await Cliente.findByPk(req.params.email);
    const clienteContato = await ClienteContato.findOne({
      where: { email: req.params.email },
    });

    return res.json(clienteContato);
  }

  async putRemoveImagemCliente(req, res) {
    const obj = {
      nome_logo: null,
      logo_path: null,
    };

    const cliente = await Cliente.findByPk(req.params.clienteId);

    const { id, nome, nome_logo, logo_path } = await cliente.update(obj);

    return res.json({
      id,
      nome,
      nome_logo,
      logo_path,
    });
  }
}

export default new ClienteController();
