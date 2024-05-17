import { api } from "@/api/api"
import { IEmployees } from "@/models/interfaces/employee"

export const useCreateEmployee = async (data: IEmployees) => {
   await api.post("/employees", data)
}