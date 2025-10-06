import prisma from '../db/prisma';
import { Unidade } from '../generated/prisma';

type UnidadeCreateData = Omit<Unidade, 'id' | 'createdAt' | 'updatedAt'>;
type UnidadeUpdateData = Partial<UnidadeCreateData>;

export const create = async (data: UnidadeCreateData): Promise<Unidade> => {
  return prisma.unidade.create({ data });
};

export const getAll = async (): Promise<Unidade[]> => {
  return prisma.unidade.findMany();
};

export const getById = async (id: number): Promise<Unidade | null> => {
  return prisma.unidade.findUnique({ where: { id } });
};

export const update = async (id: number, data: UnidadeUpdateData): Promise<Unidade> => {
  return prisma.unidade.update({ where: { id }, data });
};

export const remove = async (id: number): Promise<Unidade> => {
  return prisma.unidade.delete({ where: { id } });
};