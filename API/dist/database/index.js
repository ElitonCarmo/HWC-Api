"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

var _Cliente = require('../app/models/Cliente'); var _Cliente2 = _interopRequireDefault(_Cliente);
var _Colaborador = require('../app/models/Colaborador'); var _Colaborador2 = _interopRequireDefault(_Colaborador);
var _EmpresaExterior = require('../app/models/EmpresaExterior'); var _EmpresaExterior2 = _interopRequireDefault(_EmpresaExterior);
var _LogAcesso = require('../app/models/LogAcesso'); var _LogAcesso2 = _interopRequireDefault(_LogAcesso);
var _Parametros = require('../app/models/Parametros'); var _Parametros2 = _interopRequireDefault(_Parametros);
var _Servico = require('../app/models/Servico'); var _Servico2 = _interopRequireDefault(_Servico);
var _Processo = require('../app/models/Processo'); var _Processo2 = _interopRequireDefault(_Processo);
var _ProcessoServico = require('../app/models/ProcessoServico'); var _ProcessoServico2 = _interopRequireDefault(_ProcessoServico);
var _ProcessoStatus = require('../app/models/ProcessoStatus'); var _ProcessoStatus2 = _interopRequireDefault(_ProcessoStatus);

var _database = require('../config/database'); var _database2 = _interopRequireDefault(_database);

const models = [
  _Cliente2.default,
  _Colaborador2.default,
  _LogAcesso2.default,
  _Parametros2.default,
  _Servico2.default,
  _Processo2.default,
  _ProcessoServico2.default,
  _ProcessoStatus2.default,
  _EmpresaExterior2.default,
];

const modelsAssociate = [_LogAcesso2.default, _Processo2.default, _ProcessoServico2.default, _ProcessoStatus2.default];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new (0, _sequelize2.default)(_database2.default);

    models.map((model) => model.init(this.connection));

    modelsAssociate.map(
      (model) => model.associate && model.associate(this.connection.models)
    );
  }
}

exports. default = new Database();
