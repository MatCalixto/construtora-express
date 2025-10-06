import prisma from '../db/prisma';
import { Visita } from '../generated/prisma';

type VisitaCreateData = Omit<Visita, 'id' | 'createdAt' | 'updatedAt'>;
type VisitaUpdateData = Partial<Omit<Visita, 'id' | 'createdAt' | 'updatedAt' | 'clienteId' | 'corretorId'>>;

export const create = async (data: VisitaCreateData): Promise<Visita> => {
  const { clienteId, corretorId } = data;
  
  const cliente = await prisma.cliente.findUnique({ where: { id: clienteId } });
  if (!cliente) throw new Error('cliente não encontrado');
  
  const corretor = await prisma.corretor.findUnique({ where: { id: corretorId } });
  if (!corretor) throw new Error('corretor não encontrado');

  return prisma.visita.create({
    data: { ...data, dataHora: new Date(data.dataHora) },
  });
};

export const getAll = async () => {
  return prisma.visita.findMany({
    include: {
      cliente: { select: { nome: true, cpf: true } },
      corretor: { select: { nome: true, creci: true } },
    },
  });
};

export const getById = async (id: number) => {
  return prisma.visita.findUnique({
    where: { id },
    include: { cliente: true, corretor: true },
  });
};

export const update = async (id: number, data: VisitaUpdateData): Promise<Visita> => {
  return prisma.visita.update({
    where: { id },
    data: { ...data, dataHora: data.dataHora ? new Date(data.dataHora) : undefined },
  });
};

export const remove = async (id: number): Promise<Visita> => {
  return prisma.visita.delete({ where: { id } });
};