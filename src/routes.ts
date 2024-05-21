import express, { Router } from 'express';

import { estaAutenticado } from './middlewares/estaAutenticado';

import { CadClienteController } from './controllers/Cliente/CadClienteController';
import { AltClienteController } from './controllers/Cliente/AltClienteController';
import { GetClienteController } from './controllers/Cliente/GetClienteController';

import { CadUsuarioController } from './controllers/Usuario/CadUsuarioController';
import { AltUsuarioController } from './controllers/Usuario/AltUsuarioController';
import { StatUsuarioController } from './controllers/Usuario/StatUsuarioController';
import { GetMailUsuarioFromLoginController } from './controllers/Usuario/GetMailUsuarioFromLoginController';
import { TokenValidateController } from './controllers/Usuario/TokenValidateController';
import { CadSenhaUsuarioController } from './controllers/Usuario/CadSenhaUsuarioController';
import { LoginUsuarioController } from './controllers/Usuario/LoginUsuarioController';
import { ConsUsuarioController } from './controllers/Usuario/ConsUsuarioController';
import { DetalheUsuarioController } from './controllers/Usuario/DetalheUsuarioController';
import { AltSenhaUsuarioController } from './controllers/Usuario/AltSenhaUsuarioController';

import { DiretorioArquivos } from './enums/dirs_files';

const router = Router();

// --- Rotas CLIENTE ---
router.post('/cliente/cad', estaAutenticado, new CadClienteController().handle);
router.put('/cliente/alt', estaAutenticado, new AltClienteController().handle);
router.get('/cliente/get', estaAutenticado, new GetClienteController().handle);

// --- Rotas USUARIO ---
router.post('/usuario/cad', estaAutenticado, new CadUsuarioController().handle);
router.put('/usuario/alt', estaAutenticado, new AltUsuarioController().handle);
router.put(
  '/usuario/changestatus',
  estaAutenticado,
  new StatUsuarioController().handle
);
router.get('/usuario/getmail', new GetMailUsuarioFromLoginController().handle);
router.post('/usuario/tokenvalidation', new TokenValidateController().handle);
router.put('/usuario/resetpass', new CadSenhaUsuarioController().handle);
router.post('/usuario/login', new LoginUsuarioController().handle);
router.get(
  '/usuario/cons',
  estaAutenticado,
  new ConsUsuarioController().handle
);
router.get(
  '/usuario/info',
  estaAutenticado,
  new DetalheUsuarioController().handle
);
router.put(
  '/usuario/changepass',
  estaAutenticado,
  new AltSenhaUsuarioController().handle
);
// router.delete('/user/rem', estaAutenticado, new RemoveUserController().handle);

export { router };
