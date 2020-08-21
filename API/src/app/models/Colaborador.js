import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class tbcolaborador extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        nome_logo: Sequelize.STRING,
        logo_path: Sequelize.STRING,
        cpf_cnpj: Sequelize.STRING,
        email: Sequelize.STRING,
        senha: Sequelize.VIRTUAL,
        senha_hash: Sequelize.STRING,
        ativo: Sequelize.TINYINT,
        tipo: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `${process.env.APP_URL}/files/${this.logo_path}`;
          },
        },
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async (colaborador) => {
      if (colaborador.senha) {
        colaborador.senha_hash = await bcrypt.hash(colaborador.senha, 8);
      }
    });

    return this;
  }

  checkPassword(senha) {
    return bcrypt.compare(senha, this.senha_hash);
  }
}

export default tbcolaborador;
