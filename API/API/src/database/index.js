import Sequelize from 'sequelize';

import Cliente from '../app/models/Cliente';
import Colaborador from '../app/models/Colaborador';
import EmpresaExterior from '../app/models/EmpresaExterior';
import Log from '../app/models/LogAcesso';
import Parametros from '../app/models/Parametros';
import Servico from '../app/models/Servico';
import Processo from '../app/models/Processo';
import ProcessoServico from '../app/models/ProcessoServico';
import ProcessoStatus from '../app/models/ProcessoStatus';

import databaseConfig from '../config/database';

const models = [
  Cliente,
  Colaborador,
  Log,
  Parametros,
  Servico,
  Processo,
  ProcessoServico,
  ProcessoStatus,
  EmpresaExterior,
];

const modelsAssociate = [Log, Processo, ProcessoServico, ProcessoStatus];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map((model) => model.init(this.connection));

    modelsAssociate.map(
      (model) => model.associate && model.associate(this.connection.models)
    );
  }
}

export default new Database();
