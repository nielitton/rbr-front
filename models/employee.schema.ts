import { z } from "zod";

export const employeeSchema = z.object({
    name: z.string().min(1, "Nome é obrigatório!"),
    admissionDate: z.string().min(10, "Data de admissão é obrigatória").max(10, "Data de admissão é muito grande"),
    department: z.string().min(1, "Departamento é obrigatório!"),
    charge: z.string().min(1, "Cargo é obrigatório!")
})