import express from "express";
import { Express, Request, Response } from "express";
import { Prisma, PrismaClient, User } from "./generated/prisma";

const app: Express = express();
const port: number = 3000;
const prisma = new PrismaClient();

app.use(express.json());

app.get("/users", async (req: Request, res: Response) => {
    const users: User[] = await prisma.user.findMany();
    res.json(users);
});

app.get("/users/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    if (isNaN(id) || id <= 0) {
        return res.status(400).json({ message: "ID inválido. Deve ser um número inteiro positivo." });
    }

    const user: User | null = await prisma.user.findUnique({ where: { id } });

    if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
    }
    res.json(user);
});

app.post("/users", async (req: Request, res: Response) => {
    const { nome, idade }: { nome: string; idade: number } = req.body;

    if (typeof nome !== 'string' || nome.trim() === "") {
        return res.status(400).json({ message: "O nome é obrigatório e não pode estar vazio." });
    }
    if (typeof idade !== 'number' || !Number.isInteger(idade) || idade <= 0) {
        return res.status(400).json({ message: "A idade é obrigatória e deve ser um número inteiro positivo." });
    }
    
    try {
        const user: User = await prisma.user.create({
            data: {
                nome,
                idade,
            },
        });
        res.status(201).json(user);
    } catch (error) {
        return res.status(409).json({ message: "Já existe um usuário com este nome." });
    }
});

app.put("/users/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    if (isNaN(id) || id <= 0) {
        return res.status(400).json({ message: "ID inválido. Deve ser um número inteiro positivo." });
    }

    const { nome, idade }: { nome?: string; idade?: number } = req.body;
    const dataToUpdate: { nome?: string; idade?: number } = {};

    if (nome !== undefined) {
        if (typeof nome !== 'string' || nome.trim() === "") {
            return res.status(400).json({ message: "O nome, se fornecido, não pode estar vazio." });
        }
        dataToUpdate.nome = nome;
    }

    if (idade !== undefined) {
        if (typeof idade !== 'number' || !Number.isInteger(idade) || idade <= 0) {
            return res.status(400).json({ message: "A idade, se fornecida, deve ser um número inteiro positivo." });
        }
        dataToUpdate.idade = idade;
    }

    if (Object.keys(dataToUpdate).length === 0) {
        return res.status(400).json({ message: "Nenhum dado para atualizar foi fornecido (nome ou idade)." });
    }

    try {
        const user = await prisma.user.update({
            where: { id },
            data: dataToUpdate,
        });
        res.json(user);
    } catch (error) {
        return res.status(404).json({ message: "Usuário não encontrado" });
    }
});

app.delete("/users/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    if (isNaN(id) || id <= 0) {
        return res.status(400).json({ message: "ID inválido. Deve ser um número inteiro positivo." });
    }

    try {
        await prisma.user.delete({ where: { id } });
        res.status(204).send();
    } catch (error) {
        return res.status(404).json({ message: "Usuário não encontrado" });
    }
});

app.listen(port, () => {
    console.log(`A API subiu na porta ${port}`)
});