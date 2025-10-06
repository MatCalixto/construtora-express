import { Router } from "express";
import {
  createCliente,
  getAllClientes,
  getClienteById,
  updateCliente,
  deleteCliente,
} from "../controllers/clienteController";
import { validateBody, validateParams } from "../middlewares/validation";
import {
  createClienteSchema,
  updateClienteSchema,
  idParamSchema,
} from "../schemas/validation";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Clientes
 *   description: Gerenciamento de Clientes
 */

/**
 * @swagger
 * /clientes:
 *   post:
 *     summary: Cria um novo Cliente
 *     tags: [Clientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - cpf
 *               - email
 *               - senha
 *               - dataNascimento
 *             properties:
 *               nome:
 *                 type: string
 *               cpf:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *               telefone:
 *                 type: string
 *               dataNascimento:
 *                 type: string 
 *     responses:
 *       201:
 *         description: Cliente criado com sucesso
 *       400:
 *         description: Erro na requisição
 *       500:
 *         description: Erro interno do servidor
 */
router.post("/clientes", validateBody(createClienteSchema), createCliente);

/**
 * @swagger
 * /clientes:
 *   get:
 *     summary: Retorna todos os Clientes
 *     tags: [Clientes]
 *     responses:
 *       200:
 *         description: Lista de Clientes
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/clientes", getAllClientes);

/**
 * @swagger
 * /clientes/{id}:
 *   get:
 *     summary: Retorna um Cliente pelo ID
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cliente encontrado
 *       404:
 *         description: Cliente não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/clientes/:id", validateParams(idParamSchema), getClienteById);

/**
 * @swagger
 * /clientes/{id}:
 *   put:
 *     summary: Atualiza um Cliente
 *     tags: [Clientes]
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
 *         description: Cliente atualizado com sucesso
 *       400:
 *         description: Erro na requisição
 *       404:
 *         description: Cliente não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.put(
  "/clientes/:id",
  validateParams(idParamSchema),
  validateBody(updateClienteSchema),
  updateCliente
);

/**
 * @swagger
 * /clientes/{id}:
 *   delete:
 *     summary: Deleta um Cliente
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Cliente deletado com sucesso
 *       404:
 *         description: Cliente não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.delete("/clientes/:id", validateParams(idParamSchema), deleteCliente);

export default router;