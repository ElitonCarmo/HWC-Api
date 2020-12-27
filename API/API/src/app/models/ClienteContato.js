import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class tbclientecontato extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        cliente_id: Sequelize.INTEGER,
        cpf_cnpj: Sequelize.STRING,
        email: Sequelize.STRING,
        senha: Sequelize.VIRTUAL,
        senha_hash: Sequelize.STRING,
        envio_email: Sequelize.TINYINT,
        ativo: Sequelize.TINYINT,
        id_celular: Sequelize.STRING,   
      },
      {
        sequelize,
      }
    );

    
    this.addHook('beforeSave', async (cliente) => {
      if (cliente.senha) {
        cliente.senha_hash = await bcrypt.hash(cliente.senha, 8);
      }
    });
    

    return this;
  }

 
  static associate(models) {
    this.belongsTo(models.tbcliente, {
      foreignKey: 'cliente_id',
      as: 'cliente',
    });   
  }
  
  checkPassword(senha) {
    return bcrypt.compare(senha, this.senha_hash);
  }
}

export default tbclientecontato;
