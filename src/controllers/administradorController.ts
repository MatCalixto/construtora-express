import { Request, Response } from 'express';
import * as administradorService from '../services/administradorService';

export const createAdministrador = async (req: Request, res: Response) => {
  try {
    const administrador = await administradorService.create(req.body);
    return res.status(201).json(administrador);
  } catch (error: any) {
    if (error.code === 'P2002') {
      return res.status(409).json({ message: 'Email já está em uso.' });
    }
    return res.status(500).json({ message: error.message });
  }
};

export const getAllAdministradores = async (req: Request, res: Response) => {
  try {
    const administradores = await administradorService.getAll();
    return res.json(administradores);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAdministradorById = async (req: Request, res: Response) => {
  try {
    const administrador = await administradorService.getById(Number(req.params.id));
    if (!administrador) return res.status(404).json({ message: 'Admnistrador(a) não encontrado(a).' });
    return res.json(administrador);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateAdministrador = async (req: Request, res: Response) => {
  try {
    const administrador = await administradorService.update(Number(req.params.id), req.body);
    return res.json(administrador);
  } catch (error: any) {
    if (error.code === 'P2025') return res.status(404).json({ message: 'Administrador(a) não encontrado(a).' });
    if (error.code === 'P2002') return res.status(409).json({ message: 'Email já está em uso.' });
    return res.status(500).json({ message: error.message });
  }
};

export const deleteAdministrador = async (req: Request, res: Response) => {
  try {
    await administradorService.remove(Number(req.params.id));
    return res.status(204).send();
  } catch (error: any) {
    if (error.code === 'P2025') return res.status(404).json({ message: 'Admnistrador(a) não encontrado(a).' });
    return res.status(500).json({ message: error.message });
  }
};