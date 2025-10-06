import { Request, Response } from 'express';
import * as unidadeService from '../services/unidadeService';

export const createUnidade = async (req: Request, res: Response) => {
  try {
    const unidade = await unidadeService.create(req.body);
    return res.status(201).json(unidade);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const getAllUnidades = async (req: Request, res: Response) => {
  try {
    const unidades = await unidadeService.getAll();
    return res.json(unidades);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUnidadeById = async (req: Request, res: Response) => {
  try {
    const unidade = await unidadeService.getById(Number(req.params.id));
    if (!unidade) return res.status(404).json({ message: 'unidade não encontrada.' });
    return res.json(unidade);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateUnidade = async (req: Request, res: Response) => {
  try {
    const unidade = await unidadeService.update(Number(req.params.id), req.body);
    return res.json(unidade);
  } catch (error: any) {
    if (error.code === 'P2025') return res.status(404).json({ message: 'unidade não encontrada.' });
    return res.status(500).json({ message: error.message });
  }
};

export const deleteUnidade = async (req: Request, res: Response) => {
  try {
    await unidadeService.remove(Number(req.params.id));
    return res.status(204).send();
  } catch (error: any) {
    if (error.code === 'P2025') return res.status(404).json({ message: 'unidade não encontrada.' });
    return res.status(500).json({ message: error.message });
  }
};