import { Router } from 'express';
import administradorRoutes from './administradorRoutes';
import clienteRoutes from './clienteRoutes';
import corretorRoutes from './corretorRoutes';
import visitaRoutes from './visitaRoutes';

const routes = Router();

routes.use(administradorRoutes);
routes.use(clienteRoutes);
routes.use(corretorRoutes);
routes.use(visitaRoutes);

export default routes;