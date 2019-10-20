import { Router } from 'express';
import authMiddleware from './app/middlewares/auth';
import studentMiddleware from './app/middlewares/student';

import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import StudentController from './app/controllers/StudentController';

const routes = new Router();

routes.get('/', async (req, res) => {
  return res.json({ message: 'Hello!' });
});

// Rotas de criação de usuário e autenticação
routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

// Validação das demais rotas para verificar se o token de autenticação
// esta informado.
routes.use(authMiddleware);

// Rotas de usuários
routes.put('/users', UserController.update);

// Rotas de estudantes
// Na criação ou atualização de estudantes, o usuário já deverá ter sido
// autenticado
routes.post('/students', StudentController.store);
routes.put('/students/:id', studentMiddleware, StudentController.update);

export default routes;
