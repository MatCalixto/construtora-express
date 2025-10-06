import { Router } from "express";
import {
  createAdministrador,
  getAllAdministradores,
  getAdministradorById,
  updateAdministrador,
  deleteAdministrador,
} from "../controllers/administradorController";
import { validateBody, validateParams } from "../middlewares/validation";
import {
  createAdministradorSchema,
  updateAdministradorSchema,
  idParamSchema,
} from "../schemas/validation";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Administradores
 *   description: Gerenciamento de administradors
 */

/**
 * @swagger
 * /administradores:
 *   post:
 *     summary: Cria um novo administrador que irá usar o sistema
 *     tags: [Administradores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - email
 *               - senha
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *               telefone:
 *                 type: string
 *     responses:
 *       201:
 *         description: administrador criado com sucesso
 *       400:
 *         description: Erro na requisição
 *       500:
 *         description: Erro interno do servidor
 */
router.post(
  "/administradores",
  validateBody(createAdministradorSchema),
  createAdministrador
);

/**
 * @swagger
 * /administradores:
 *   get:
 *     summary: Retorna todos os administradors cadastradpos no banco
 *     tags: [Administradores]
 *     responses:
 *       200:
 *         description: Lista de administradors
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/administradores", getAllAdministradores);

/**
 * @swagger
 * /administradores/{id}:
 *   get:
 *     summary: Retorna um administrador pelo ID
 *     tags: [Administradores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: administrador encontrado
 *       404:
 *         description: administrador não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.get(
  "/administradores/:id",
  validateParams(idParamSchema),
  getAdministradorById
);

/**
 * @swagger
 * /administradores/{id}:
 *   put:
 *     summary: Atualiza um administrador
 *     tags: [Administradores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               telefone:
 *                 type: string
 *     responses:
 *       200:
 *         description: administrador atualizado com sucesso
 *       400:
 *         description: Erro na requisição
 *       404:
 *         description: administrador não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.put(
  "/administradores/:id",
  validateParams(idParamSchema),
  validateBody(updateAdministradorSchema),
  updateAdministrador
);

/**
 * @swagger
 * /administradores/{id}:
 *   delete:
 *     summary: Deleta um administrador
 *     tags: [Administradores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: administrador deletado com sucesso
 *       404:
 *         description: administrador não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.delete(
  "/administradores/:id",
  validateParams(idParamSchema),
  deleteAdministrador
);

export default router;