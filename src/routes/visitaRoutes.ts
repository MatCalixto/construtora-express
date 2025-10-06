import { Router } from "express";
import {
  createVisita,
  getAllVisitas,
  getVisitaById,
  updateVisita,
  deleteVisita,
} from "../controllers/visitaController";
import { validateBody, validateParams } from "../middlewares/validation";
import {
  createVisitaSchema,
  updateVisitaSchema,
  idParamSchema,
} from "../schemas/validation";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Visitas
 *   description: Gerenciamento de Visitas Agendadas
 */

/**
 * @swagger
 * /visitas:
 *   post:
 *     summary: Cria uma nova visita
 *     tags: [Visitas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - dataHora
 *               - unidadade
 *               - clienteId
 *               - corretorId
 *             properties:
 *               dataHora:
 *                 type: string
 *                 format: date-time
 *               unidade:
 *                 type: string 
 *               clienteId:
 *                 type: integer
 *               corretorId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Visita criada com sucesso
 *       400:
 *         description: Erro na requisição
 *       500:
 *         description: Erro interno do servidor
 */
router.post("/visitas", validateBody(createVisitaSchema), createVisita);

/**
 * @swagger
 * /visitas:
 *   get:
 *     summary: Retorna todas as visitass
 *     tags: [Visitas]
 *     responses:
 *       200:
 *         description: Lista de visitas
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/visitas", getAllVisitas);

/**
 * @swagger
 * /visitas/{id}:
 *   get:
 *     summary: Retorna uma visita pelo ID
 *     tags: [Visitas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Visita encontrada
 *       404:
 *         description: Visita não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/visitas/:id", validateParams(idParamSchema), getVisitaById);

/**
 * @swagger
 * /visitas/{id}:
 *   put:
 *     summary: Atualiza uma visita
 *     tags: [Visitas]
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
 *               dataHora:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Visita atualizada com sucesso
 *       400:
 *         description: Erro na requisição
 *       404:
 *         description: Visita não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.put(
  "/visitas/:id",
  validateParams(idParamSchema),
  validateBody(updateVisitaSchema),
  updateVisita
);

/**
 * @swagger
 * /visitas/{id}:
 *   delete:
 *     summary: Deleta uma visita
 *     tags: [Visitas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Visita deletada com sucesso
 *       404:
 *         description: Visita não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.delete("/visitas/:id", validateParams(idParamSchema), deleteVisita);

export default router;