import { Request, Response } from 'express';
import * as visitaService from '../services/visitaService';

export const createVisita = async (req: Request, res: Response) => {
  try {
    const visita = await visitaService.create(req.body);
    return res.status(201).json(visita);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const getAllVisitas = async (req: Request, res: Response) => {
  try {
    const visitas = await visitaService.getAll();
    return res.json(visitas);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getVisitaById = async (req: Request, res: Response) => {
  try {
    const visita = await visitaService.getById(Number(req.params.id));
    if (!visita) return res.status(404).json({ message: 'visita não encontrada.' });
    return res.json(visita);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateVisita = async (req: Request, res: Response) => {
  try {
    const visita = await visitaService.update(Number(req.params.id), req.body);
    return res.json(visita);
  } catch (error: any) {
    if (error.code === 'P2025') return res.status(404).json({ message: 'visita não encontrada.' });
    return res.status(500).json({ message: error.message });
  }
};

export const deleteVisita = async (req: Request, res: Response) => {
  try {
    await visitaService.remove(Number(req.params.id));
    return res.status(204).send();
  } catch (error: any) {
    if (error.code === 'P2025') return res.status(404).json({ message: 'visita não encontrada.' });
    return res.status(500).json({ message: error.message });
  }
};