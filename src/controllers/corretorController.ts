import { Request, Response } from 'express';
import * as corretorService from '../services/corretorService';

export const createCorretor = async (req: Request, res: Response) => {
  try {
    const corretor = await corretorService.create(req.body);
    return res.status(201).json(corretor);
  } catch (error: any) {
    if (error.code === 'P2002') return res.status(409).json({ message: `Campo único já existe: ${error.meta.target}` });
    return res.status(500).json({ message: error.message });
  }
};

export const getAllCorretores = async (req: Request, res: Response) => {
  try {
    const corretores = await corretorService.getAll();
    return res.json(corretores);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getCorretorById = async (req: Request, res: Response) => {
  try {
    const corretor = await corretorService.getById(Number(req.params.id));
    if (!corretor) return res.status(404).json({ message: 'Médico(a) não encontrado(a).' });
    return res.json(corretor);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateCorretor = async (req: Request, res: Response) => {
  try {
    const corretor = await corretorService.update(Number(req.params.id), req.body);
    return res.json(corretor);
  } catch (error: any) {
    if (error.code === 'P2025') return res.status(404).json({ message: 'Médico(a) não encontrado(a).' });
    if (error.code === 'P2002') return res.status(409).json({ message: `Campo único já existe: ${error.meta.target}` });
    return res.status(500).json({ message: error.message });
  }
};

export const deleteCorretor = async (req: Request, res: Response) => {
  try {
    await corretorService.remove(Number(req.params.id));
    return res.status(204).send();
  } catch (error: any) {
    if (error.code === 'P2025') return res.status(404).json({ message: 'Médico(a) não encontrado(a).' });
    return res.status(500).json({ message: error.message });
  }
};