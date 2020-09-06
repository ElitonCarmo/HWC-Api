import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class tbparametros extends Model {
  static init(sequelize) {
    super.init(
      {
        nome_empresa: Sequelize.STRING,
        nome_logo: Sequelize.STRING,
        logo_path: Sequelize.STRING,
        cpf_cnpj: Sequelize.STRING,
        login: Sequelize.STRING,
        senha: Sequelize.VIRTUAL,
        senha_hash: Sequelize.STRING,
        ativo: Sequelize.TINYINT,
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

    this.addHook('beforeSave', async (parametros) => {
      if (parametros.senha) {
        parametros.senha_hash = await bcrypt.hash(parametros.senha, 8);
      }
    });

    return this;
  }

  checkPassword(senha) {
    return bcrypt.compare(senha, this.senha_hash);
  }
}

export default tbparametros;
