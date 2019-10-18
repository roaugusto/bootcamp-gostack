import { Router } from 'express';
import User from './app/models/User';

const routes = new Router();

routes.get('/', async (req, res) => {
  const user = await User.create({
    name: 'Rodrigo Santos',
    email: 'ro.augusto@gmail.com',
    password_hash: '12313213213',
  });

  return res.json(user);
});

export default routes;
