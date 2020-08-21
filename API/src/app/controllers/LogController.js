import * as Yup from 'yup';
import Log from '../models/LogAcesso';
import Cliente from '../models/Cliente';

class LogController {
  async store(req, res) {
    const schema = Yup.object().shape({
      cliente_id: Yup.number().required(),
      dispositivo_acesso: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails.' });
    }

    const cliente_Existe = await Cliente.findOne({
      where: { id: req.body.cliente_id },
    });

    if (!cliente_Existe) {
      return res.status(400).json({ error: 'Cliente não existe.' });
    }

    const { id, cliente_id, dispositivo_acesso } = await Log.create(req.body);

    return res.json({
      id,
      cliente_id,
      dispositivo_acesso,
    });
  }

  async index(req, res) {
    const log = await Log.findAll({
      attributes: [
        'id',
        'cliente_id',
        'dispositivo_acesso',
        'created_at',
        'updated_at',
      ],
      include: [
        {
          model: Cliente,
          as: 'cliente',
          attributes: ['id', 'nome'],
        },
      ],
    });

    return res.json(log);
  }
}

export default new LogController();
