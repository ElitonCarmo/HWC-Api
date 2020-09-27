import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import ClienteController from './app/controllers/ClienteController';
import ColaboradorController from './app/controllers/ColaboradorController';
import EmpresaExteriorController from './app/controllers/EmpresaExteriorController';
import LogController from './app/controllers/LogController';
import SessionController from './app/controllers/SessionController';
import ParametrosController from './app/controllers/ParametrosController';
import ServicoController from './app/controllers/ServicoController';
import ProcessoController from './app/controllers/ProcessoController';
import ProcessoServicoController from './app/controllers/ProcessoServicoController';
import ProcessoStatusController from './app/controllers/ProcessoStatusController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/log', LogController.store);

routes.post('/sessions', SessionController.store);

routes.post('/servico', ServicoController.store);

routes.post('/processo', ProcessoController.store);

routes.post('/processoservico', ProcessoServicoController.store);

routes.get(
  '/processoservico/getTotalServicos/:id',
  ProcessoServicoController.getTotalServicos
);

routes.post('/processostatus', ProcessoStatusController.store);

routes.post('/empresaexterior', EmpresaExteriorController.store);

// multipart form data request (Sem necessidade do Token de autenticação)

routes.post('/cliente', upload.single('file'), ClienteController.store);

routes.post('/colaborador', upload.single('file'), ColaboradorController.store);

routes.get('/', (req, res) => res.send('ok'));

// tudo o que estiver abaixo do middleware necessita do token de autenticação
routes.use(authMiddleware);

routes.put('/servico', ServicoController.update);

routes.put('/processo', ProcessoController.update);

routes.put('/processoservico', ProcessoServicoController.update);

routes.put('/processostatus', ProcessoStatusController.update);

routes.put('/empresaexterior', EmpresaExteriorController.update);

routes.put(
  '/cliente/updateIdCelularCliente',
  ClienteController.updateIdCelularCliente
);

routes.put(
  '/cliente/putRemoveImagemCliente/:clienteId',
  ClienteController.putRemoveImagemCliente
);

routes.put(
  '/colaborador/putRemoveImagemColaborador/:colaboradorId',
  ColaboradorController.putRemoveImagemColaborador
);

routes.get('/cliente', ClienteController.index);

routes.get('/cliente/getClientesAtivos', ClienteController.getClientesAtivos);

routes.get('/colaborador', ColaboradorController.index);

routes.get(
  '/colaborador/getColaboradoresAtivos',
  ColaboradorController.getColaboradoresAtivos
);

routes.get('/empresaexterior', EmpresaExteriorController.index);

routes.get(
  '/empresaexterior/getEmpresasAtivas',
  EmpresaExteriorController.getEmpresasAtivas
);

routes.get('/log', LogController.index);

routes.get('/parametros', ParametrosController.index);

routes.get(
  '/parametros/getParametrosAtivos',
  ParametrosController.getParametrosAtivos
);

routes.get('/servico', ServicoController.index);

routes.get('/servico/getServicosAtivos', ServicoController.getServicosAtivos);

routes.get('/processo', ProcessoController.index);

routes.get(
  '/processo/cliente/getProcessosPorClienteId/:idCliente',
  ProcessoController.getProcessosPorClienteId
);

routes.get(
  '/processo/getProcessosCliente',
  ProcessoController.getProcessosCliente
);

routes.get(
  '/processo/getProcessosColaborador',
  ProcessoController.getProcessosColaborador
);

routes.get('/processoservico', ProcessoServicoController.index);

routes.get(
  '/processoservico/getServicosDoProcesso',
  ProcessoServicoController.getServicosDoProcesso
);

routes.get(
  '/processostatus/getStatusDoProcesso',
  ProcessoStatusController.getStatusDoProcesso
);

routes.get(
  '/processostatus/getStatusNaoExibidosParaOCliente',
  ProcessoStatusController.getStatusNaoExibidosParaOCliente
);

routes.get(
  '/processostatus/getUltimosStatusDoProcesso',
  ProcessoStatusController.getUltimosStatusDoProcesso
);

routes.get('/processostatus', ProcessoStatusController.index);

routes.get(
  '/processostatus/:processoId',
  ProcessoStatusController.getStatusProcesso
);

routes.get(
  '/cliente/getClientePorCodigo/:id',
  ClienteController.getClientePorCodigo
);

routes.put(
  '/cliente/alterarConfiguracoes',
  ClienteController.alterarConfiguracoes
);

routes.put(
  '/colaborador/alterarConfiguracoes',
  ColaboradorController.alterarConfiguracoes
);

// multipart form data request
routes.post('/parametros', upload.single('file'), ParametrosController.store);

routes.put('/cliente', upload.single('file'), ClienteController.update);

routes.put('/colaborador', upload.single('file'), ColaboradorController.update);

export default routes;
