import prisma from '../db/prisma';
import { Corretor } from '../generated/prisma';

type CorretorCreateData = Omit<Corretor, 'id' | 'createdAt' | 'updatedAt'>;
type CorretorUpdateData = Partial<CorretorCreateData>;

export const create = async (data: CorretorCreateData): Promise<Corretor> => {
  return prisma.corretor.create({ data });
};

export const getAll = async (): Promise<Corretor[]> => {
  return prisma.corretor.findMany();
};

export const getById = async (id: number): Promise<Corretor | null> => {
  return prisma.corretor.findUnique({ where: { id } });
};

export const update = async (id: number, data: CorretorUpdateData): Promise<Corretor> => {
  return prisma.corretor.update({ where: { id }, data });
};

export const remove = async (id: number): Promise<Corretor> => {
  return prisma.corretor.delete({ where: { id } });
};