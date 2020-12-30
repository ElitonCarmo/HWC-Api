import * as Yup from 'yup';
import ClienteContato from '../models/ClienteContato';

class ClienteContatoController {
  async store(req, res) {


    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      //cpf_cnpj: Yup.string().required(),
      email: Yup.string().email().required(),
      senha: Yup.string().required().min(6),
      //tipo: Yup.string().required(),
    });

    let obj;

    obj = {
      nome: req.body.nome,
      cpf_cnpj: ' - ',
      cliente_id: req.body.cliente_id,
      email: req.body.email,
      senha: req.body.senha,
      ativo: req.body.ativo ? 1 : 0,
    };



    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails.' });
    }


    /*
        const emailExiste = await ClienteContato.findOne({
          where: { email: req.body.email },
        });
        
        if (emailExiste) {
          return res
            .status(400)
            .json({ error: 'E-mail do cliente já cadastrado.' });
        }
    */

    // Retornar objeto completo da tabela
    // const cliente = await Cliente.create(req.body);

    // return res.json(cliente);

    // Retornar apenas os campos necessários da tabela


    console.log('10Teste Salvar Contato 1');
    console.log(obj);
    console.log('10Teste Salvar Contato 2');

    const {
      id,
      nome,
      email,
      ativo,
      tipo,
    } = await ClienteContato.create(obj);

    console.log('9@@@@@@@@@@@@@@@@');

    return res.json({
      id,
      nome,
      email,
      ativo,
      tipo,
    });
  }

  async getAcessosDeUmaEmpresa(req, res) {
    const clientesContato = await ClienteContato.findAll({
      where: { cliente_id: req.params.id },
      order: [['nome']],
      attributes: [
        'id',
        'nome',
        'cliente_id',
        'cpf_cnpj',
        'email',
        'envio_email',
        'ativo',
        'created_at',
        'updated_at',
      ],
    });

    return res.json(clientesContato);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string(),
      email: Yup.string().email(),
      //cpf_cnpj: Yup.string(),
      //tipo: Yup.string(),
    });

    let obj = {
      id: req.body.id,
      nome: req.body.nome,
      cpf_cnpj: ' - ',
      cliente_id: req.body.cliente_id,
      email: req.body.email,
      ativo: req.body.ativo ? 1 : 0,
    };

    if (req.body.alterarSenha) obj.senha = req.body.senha;

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails.' });
    }

    console.log('10Chegou no upload');

    const clienteContato = await ClienteContato.findByPk(req.body.id);  
  

    console.log('10Chegou no upload');
    console.log(obj);
    console.log(req.body);
    console.log(clienteContato);



    const {
      id,
      nome,
      email,
      ativo
    } = await clienteContato.update(obj);

    return res.json({
      id,
      nome,
      email,
      ativo
    });
  }


}

export default new ClienteContatoController();
