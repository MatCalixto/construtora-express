import prisma from '../db/prisma';
import { Administrador } from '../generated/prisma';
import bcrypt from 'bcryptjs';

type AdministradorCreateData = Omit<Administrador, 'id' | 'createdAt' | 'updatedAt'>;
type AdministradorUpdateData = Partial<Omit<Administrador, 'id' | 'createdAt' | 'updatedAt' | 'senha'>>;

export const create = async (data: AdministradorCreateData): Promise<Omit<Administrador, 'senha'>> => {
  const hashSenha = await bcrypt.hash(data.senha, 10);
  const administrador = await prisma.administrador.create({
    data: { ...data, senha: hashSenha },
  });
  const { senha, ...administradorSemSenha } = administrador;
  return administradorSemSenha;
};

export const getAll = async (): Promise<Omit<Administrador, 'senha'>[]> => {
  return prisma.administrador.findMany({
    select: { id: true, nome: true, email: true, telefone: true, createdAt: true, updatedAt: true },
  });
};

export const getById = async (id: number): Promise<Omit<Administrador, 'senha'> | null> => {
  return prisma.administrador.findUnique({
    where: { id },
    select: { id: true, nome: true, email: true, telefone: true, createdAt: true, updatedAt: true },
  });
};

export const update = async (id: number, data: AdministradorUpdateData): Promise<Omit<Administrador, 'senha'>> => {
  return prisma.administrador.update({
    where: { id },
    data,
    select: { id: true, nome: true, email: true, telefone: true, createdAt: true, updatedAt: true },
  });
};

export const remove = async (id: number): Promise<Administrador> => {
  return prisma.administrador.delete({ where: { id } });
};