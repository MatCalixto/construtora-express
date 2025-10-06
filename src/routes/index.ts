import { Router } from 'express';
import administradorRoutes from './administradorRoutes';
import clienteRoutes from './clienteRoutes';
import corretorRoutes from './corretorRoutes';
import visitaRoutes from './visitaRoutes';
import unidadeRoutes from './unidadeRoutes';

const routes = Router();

routes.use(administradorRoutes);
routes.use(clienteRoutes);
routes.use(corretorRoutes);
routes.use(visitaRoutes);
routes.use(unidadeRoutes);

export default routes;