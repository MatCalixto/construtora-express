import { Router } from "express";
import {
  createCorretor,
  getAllCorretores,
  getCorretorById,
  updateCorretor,
  deleteCorretor,
} from "../controllers/corretorController";
import { validateBody, validateParams } from "../middlewares/validation";
import {
  createCorretorSchema,
  updateCorretorSchema,
  idParamSchema,
} from "../schemas/validation";
const router = Router();

/**
 * @swagger
 * tags:
 *   name: Corretores
 *   description: Gerenciamento de corretores
 */

/**
 * @swagger
 * /corretores:
 *   post:
 *     summary: Cria um novo corretor
 *     tags: [Corretores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - email
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               creci:
 *                 type: string
 *     responses:
 *       201:
 *         description: corretor criado com sucesso
 *       400:
 *         description: Erro na requisição
 *       500:
 *         description: Erro interno do servidor
 */
router.post("/corretores", validateBody(createCorretorSchema), createCorretor);

/**
 * @swagger
 * /corretores:
 *   get:
 *     summary: Retorna todos os corretores
 *     tags: [Corretores]
 *     responses:
 *       200:
 *         description: Lista de corretores
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/corretores", getAllCorretores);

/**
 * @swagger
 * /corretores/{id}:
 *   get:
 *     summary: Retorna um corretor pelo ID
 *     tags: [Corretores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: corretor encontrado
 *       404:
 *         description: corretor não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/corretores/:id", validateParams(idParamSchema), getCorretorById);

/**
 * @swagger
 * /corretores/{id}:
 *   put:
 *     summary: Atualiza um corretor
 *     tags: [Corretores]
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
 *               creci:
 *                 type: string
 *     responses:
 *       200:
 *         description: corretor atualizado com sucesso
 *       400:
 *         description: Erro na requisição
 *       404:
 *         description: corretor não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.put(
  "/corretores/:id",
  validateParams(idParamSchema),
  validateBody(updateCorretorSchema),
  updateCorretor
);

/**
 * @swagger
 * /corretores/{id}:
 *   delete:
 *     summary: Deleta um corretor
 *     tags: [Corretores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: corretor deletado com sucesso
 *       404:
 *         description: corretor não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.delete("/corretores/:id", validateParams(idParamSchema), deleteCorretor);

export default router;