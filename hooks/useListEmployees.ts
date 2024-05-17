import { api } from "@/api/api"
import { IEmployees } from "@/models/interfaces/employee"

export const useListEmployees = async (sort: boolean = true) => {
   return (await api.get<IEmployees[]>(`/employees?sort=${sort}`)).data || []
}