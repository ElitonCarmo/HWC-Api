"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _multer3 = require('./config/multer'); var _multer4 = _interopRequireDefault(_multer3);

var _ClienteController = require('./app/controllers/ClienteController'); var _ClienteController2 = _interopRequireDefault(_ClienteController);
var _ColaboradorController = require('./app/controllers/ColaboradorController'); var _ColaboradorController2 = _interopRequireDefault(_ColaboradorController);
var _EmpresaExteriorController = require('./app/controllers/EmpresaExteriorController'); var _EmpresaExteriorController2 = _interopRequireDefault(_EmpresaExteriorController);
var _LogController = require('./app/controllers/LogController'); var _LogController2 = _interopRequireDefault(_LogController);
var _SessionController = require('./app/controllers/SessionController'); var _SessionController2 = _interopRequireDefault(_SessionController);
var _ParametrosController = require('./app/controllers/ParametrosController'); var _ParametrosController2 = _interopRequireDefault(_ParametrosController);
var _ServicoController = require('./app/controllers/ServicoController'); var _ServicoController2 = _interopRequireDefault(_ServicoController);
var _ProcessoController = require('./app/controllers/ProcessoController'); var _ProcessoController2 = _interopRequireDefault(_ProcessoController);
var _ProcessoServicoController = require('./app/controllers/ProcessoServicoController'); var _ProcessoServicoController2 = _interopRequireDefault(_ProcessoServicoController);
var _ProcessoStatusController = require('./app/controllers/ProcessoStatusController'); var _ProcessoStatusController2 = _interopRequireDefault(_ProcessoStatusController);

var _auth = require('./app/middlewares/auth'); var _auth2 = _interopRequireDefault(_auth);

const routes = new (0, _express.Router)();
const upload = _multer2.default.call(void 0, _multer4.default);

routes.post('/log', _LogController2.default.store);

routes.post('/sessions', _SessionController2.default.store);

routes.post('/servico', _ServicoController2.default.store);

routes.post('/processo', _ProcessoController2.default.store);

routes.post('/processoservico', _ProcessoServicoController2.default.store);

routes.get(
  '/processoservico/getTotalServicos/:id',
  _ProcessoServicoController2.default.getTotalServicos
);

routes.post('/processostatus', _ProcessoStatusController2.default.store);

routes.post('/empresaexterior', _EmpresaExteriorController2.default.store);

// multipart form data request (Sem necessidade do Token de autenticação)

routes.post('/cliente', upload.single('file'), _ClienteController2.default.store);

routes.post('/colaborador', upload.single('file'), _ColaboradorController2.default.store);

routes.get('/', (req, res) => res.send('ok teste'));

// tudo o que estiver abaixo do middleware necessita do token de autenticação
routes.use(_auth2.default);

routes.put('/servico', _ServicoController2.default.update);

routes.put('/processo', _ProcessoController2.default.update);

routes.put('/processoservico', _ProcessoServicoController2.default.update);

routes.put('/processostatus', _ProcessoStatusController2.default.update);

routes.put('/empresaexterior', _EmpresaExteriorController2.default.update);

routes.put(
  '/cliente/putRemoveImagemCliente/:clienteId',
  _ClienteController2.default.putRemoveImagemCliente
);

routes.put(
  '/colaborador/putRemoveImagemColaborador/:colaboradorId',
  _ColaboradorController2.default.putRemoveImagemColaborador
);

routes.get('/cliente', _ClienteController2.default.index);

routes.get('/cliente/getClientesAtivos', _ClienteController2.default.getClientesAtivos);

routes.get('/colaborador', _ColaboradorController2.default.index);

routes.get(
  '/colaborador/getColaboradoresAtivos',
  _ColaboradorController2.default.getColaboradoresAtivos
);

routes.get('/empresaexterior', _EmpresaExteriorController2.default.index);

routes.get(
  '/empresaexterior/getEmpresasAtivas',
  _EmpresaExteriorController2.default.getEmpresasAtivas
);

routes.get('/log', _LogController2.default.index);

routes.get('/parametros', _ParametrosController2.default.index);

routes.get(
  '/parametros/getParametrosAtivos',
  _ParametrosController2.default.getParametrosAtivos
);

routes.get('/servico', _ServicoController2.default.index);

routes.get('/servico/getServicosAtivos', _ServicoController2.default.getServicosAtivos);

routes.get('/processo', _ProcessoController2.default.index);

routes.get(
  '/processo/cliente/getProcessosPorClienteId/:idCliente',
  _ProcessoController2.default.getProcessosPorClienteId
);

routes.get(
  '/processo/getProcessosCliente',
  _ProcessoController2.default.getProcessosCliente
);

routes.get(
  '/processo/getProcessosColaborador',
  _ProcessoController2.default.getProcessosColaborador
);

routes.get('/processoservico', _ProcessoServicoController2.default.index);

routes.get(
  '/processoservico/getServicosDoProcesso',
  _ProcessoServicoController2.default.getServicosDoProcesso
);

routes.get(
  '/processostatus/getStatusDoProcesso',
  _ProcessoStatusController2.default.getStatusDoProcesso
);

routes.get(
  '/processostatus/getStatusNaoExibidosParaOCliente',
  _ProcessoStatusController2.default.getStatusNaoExibidosParaOCliente
);

routes.get(
  '/processostatus/getUltimosStatusDoProcesso',
  _ProcessoStatusController2.default.getUltimosStatusDoProcesso
);

routes.get('/processostatus', _ProcessoStatusController2.default.index);

routes.get(
  '/processostatus/:processoId',
  _ProcessoStatusController2.default.getStatusProcesso
);

routes.get(
  '/cliente/getClientePorCodigo/:id',
  _ClienteController2.default.getClientePorCodigo
);

routes.put(
  '/cliente/alterarConfiguracoes',
  _ClienteController2.default.alterarConfiguracoes
);

routes.put(
  '/colaborador/alterarConfiguracoes',
  _ColaboradorController2.default.alterarConfiguracoes
);

// multipart form data request
routes.post('/parametros', upload.single('file'), _ParametrosController2.default.store);

routes.put('/cliente', upload.single('file'), _ClienteController2.default.update);

routes.put('/colaborador', upload.single('file'), _ColaboradorController2.default.update);

exports. default = routes;
