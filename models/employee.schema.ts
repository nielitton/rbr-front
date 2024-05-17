import { z } from "zod";

export const employeeSchema = z.object({
    name: z.string().min(1, "Nome é obrigatório!"),
    actions: z.string().min(1, "Ações são obrigatórias!"),
    department: z.string().min(1, "Departamento é obrigatório!"),
    charge: z.string().min(1, "Cargo é obrigatório!")
})