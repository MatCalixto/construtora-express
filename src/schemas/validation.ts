import { z } from "zod";

// Schema para Administrador
export const createAdministradorSchema = z.object({
  nome: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(100, "Nome deve ter no máximo 100 caracteres"),
  email: z
    .string()
    .email({ message: "Email deve ter um formato válido" })
    .max(255, "Email deve ter no máximo 255 caracteres"),
  senha: z
    .string()
    .min(6, "Senha deve ter pelo menos 6 caracteres")
    .max(100, "Senha deve ter no máximo 100 caracteres"),
  telefone: z
    .string()
    .min(10, "Telefone deve ter pelo menos 10 caracteres")
    .max(15, "Telefone deve ter no máximo 15 caracteres")
    .optional(),
});

export const updateAdministradorSchema = createAdministradorSchema.partial();

// Schema para Corretor
export const createCorretorSchema = z.object({
  nome: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(100, "Nome deve ter no máximo 100 caracteres"),
  email: z
    .string()
    .email({ message: "Email deve ter um formato válido" })
    .max(255, "Email deve ter no máximo 255 caracteres"),
  creci: z
    .string()
    .min(4, "CRECI deve ter pelo menos 4 caracteres")
    .max(20, "CRECI deve ter no máximo 20 caracteres"),
});

export const updateCorretorSchema = createCorretorSchema.partial();

// Schema para Cliente
export const createClienteSchema = z.object({
  nome: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(100, "Nome deve ter no máximo 100 caracteres"),
  email: z
    .string()
    .email({ message: "Email deve ter um formato válido" })
    .max(255, "Email deve ter no máximo 255 caracteres"),
  cpf: z
    .string()
    .length(11, "CPF deve ter exatamente 11 dígitos")
    .regex(/^\d+$/, "CPF deve conter apenas números"),
  telefone: z
    .string()
    .min(10, "Telefone deve ter pelo menos 10 caracteres")
    .max(15, "Telefone deve ter no máximo 15 caracteres")
    .optional(),
  dataNascimento: z
    .string()
    .refine((date) => {
      const parsedDate = new Date(date);
      return !isNaN(parsedDate.getTime());
    }, "Data de nascimento deve ser uma data válida")
    .refine((date) => {
      const parsedDate = new Date(date);
      const today = new Date();
      return parsedDate < today;
    }, "Data de nascimento deve ser no passado"),
});

export const updateClienteSchema = createClienteSchema.partial();

// Schema para Visita
export const createVisitaSchema = z.object({
  dataHora: z
    .string()
    .refine((date) => {
      const parsedDate = new Date(date);
      return !isNaN(parsedDate.getTime());
    }, "Data e hora devem ser válidas")
    .refine((date) => {
      const parsedDate = new Date(date);
      const now = new Date();
      return parsedDate > now;
    }, "Data e hora da Visita devem ser no futuro"),
  clienteId: z
    .number()
    .int("ID do cliente deve ser um número inteiro")
    .positive("ID do cliente deve ser positivo"),
  corretorId: z
    .number()
    .int("ID do corretor deve ser um número inteiro")
    .positive("ID do corretor deve ser positivo"),
  unidade: z
    .string()
    .max(500, "Unidade deve ter no máximo 500 caracteres")
    .optional(),
});

export const updateVisitaSchema = createVisitaSchema.partial();

// Schema para validação de IDs
export const idParamSchema = z.object({
  id: z
    .string()
    .regex(/^\d+$/, "ID deve ser um número válido")
    .transform(Number)
    .refine((num) => num > 0, "ID deve ser positivo"),
});

// Tipos TypeScript derivados dos schemas
export type CreateAdministradorData = z.infer<typeof createAdministradorSchema>;
export type UpdateAdministradorData = z.infer<typeof updateAdministradorSchema>;
export type CreateCorretorData = z.infer<typeof createCorretorSchema>;
export type UpdateCorretorData = z.infer<typeof updateCorretorSchema>;
export type CreateClienteData = z.infer<typeof createClienteSchema>;
export type UpdateClienteData = z.infer<typeof updateClienteSchema>;
export type CreateVisitaData = z.infer<typeof createVisitaSchema>;
export type UpdateVisitaData = z.infer<typeof updateVisitaSchema>;
export type IdParam = z.infer<typeof idParamSchema>;