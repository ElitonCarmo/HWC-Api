import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import Cliente from '../models/Cliente';
import Colaborador from '../models/Colaborador';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      senha: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails.' });
    }

    const { email, senha } = req.body;

    const cliente = await Cliente.findOne({ where: { email, ativo:1 } });

    const colaborador = await Colaborador.findOne({ where: { email, ativo:1 } });

    if (!cliente && !colaborador) {
      return res.status(401).json({ error: 'Usuário não encontrado.' });
    }

    if (!cliente && colaborador) {
      if (!(await colaborador.checkPassword(senha))) {
        return res.status(401).json({ error: 'Senha incorreta.' });
      }
    } else if (cliente && !colaborador) {
      if (!(await cliente.checkPassword(senha))) {
        return res.status(401).json({ error: 'Senha incorreta.' });
      }
    }

    const { id, nome, logo_path } =
      !cliente && colaborador ? colaborador : cliente;

    const flag = !cliente && colaborador ? 'colaborador' : 'cliente';

    let tipo = '';
    if (flag === 'colaborador') tipo = colaborador.tipo;

    return res.json({
      usuario: {
        id,
        nome,
        email,
        flag,
        logo_path,
        tipo,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
