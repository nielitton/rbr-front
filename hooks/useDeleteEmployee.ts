import { api } from "@/api/api"
import { IEmployees } from "@/models/interfaces/employee"

export const useDeleteEmployee = async (id: string) => {
    return await api.delete<{ message: string, employee: IEmployees }>(`/employees/${id}`)
}