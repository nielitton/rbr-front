import { api } from "@/api/api"
import { IEmployees } from "@/models/interfaces/employee"

export const useListEmployees = async (sort: string, search: string) => {
   return (await api.get<{ employees: IEmployees[], count: number }>(`/employees?sorted=${sort}&search=${search}`)).data || []
}