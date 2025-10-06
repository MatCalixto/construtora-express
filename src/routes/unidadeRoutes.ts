import { Router } from "express";
import {
  createUnidade,
  getAllUnidades,
  getUnidadeById,
  updateUnidade,
  deleteUnidade,
} from "../controllers/unidadeController";
import { validateBody, validateParams } from "../middlewares/validation";
import {
  createUnidadeSchema,
  updateUnidadeSchema,
  idParamSchema,
} from "../schemas/validation";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Unidades
 *   description: Gerenciamento de Unidades
 */

/**
 * @swagger
 * /unidades:
 *   post:
 *     summary: Cria um novo Unidade
 *     tags: [Unidades]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *             properties:
 *               nome:
 *                 type: string
 *     responses:
 *       201:
 *         description: Unidade criado com sucesso
 *       400:
 *         description: Erro na requisição
 *       500:
 *         description: Erro interno do servidor
 */
router.post("/unidades", validateBody(createUnidadeSchema), createUnidade);

/**
 * @swagger
 * /unidades:
 *   get:
 *     summary: Retorna todos os Unidades
 *     tags: [Unidades]
 *     responses:
 *       200:
 *         description: Lista de Unidades
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/unidades", getAllUnidades);

/**
 * @swagger
 * /unidades/{id}:
 *   get:
 *     summary: Retorna um Unidade pelo ID
 *     tags: [Unidades]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Unidade encontrado
 *       404:
 *         description: Unidade não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/unidades/:id", validateParams(idParamSchema), getUnidadeById);

/**
 * @swagger
 * /unidades/{id}:
 *   put:
 *     summary: Atualiza um Unidade
 *     tags: [Unidades]
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
 *     responses:
 *       200:
 *         description: Unidade atualizado com sucesso
 *       400:
 *         description: Erro na requisição
 *       404:
 *         description: Unidade não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.put(
  "/unidades/:id",
  validateParams(idParamSchema),
  validateBody(updateUnidadeSchema),
  updateUnidade
);

/**
 * @swagger
 * /unidades/{id}:
 *   delete:
 *     summary: Deleta um Unidade
 *     tags: [Unidades]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Unidade deletado com sucesso
 *       404:
 *         description: Unidade não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.delete("/unidades/:id", validateParams(idParamSchema), deleteUnidade);

export default router;