import { api } from "@/api/api"
import { IEmployees } from "@/models/interfaces/employee"

export const useGetOneEmployee = async (id: string) => {
   return (await api.get<IEmployees>(`/employees/${id}`)).data
}