import { api } from "@/api/api"
import { IEmployees } from "@/models/interfaces/employee"

export const useUpdateEmployee = async (id: string, data: IEmployees) => {
   const newDate = data.admissionDate.split("/")

   data.admissionDate = `${newDate[2]}-${newDate[1]}-${newDate[0]}`

   await api.put(`/employees/${id}`, data)
}