'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { employeeSchema } from "@/models/employee.schema"
import { z } from "zod"
import { Button, FormControl, FormErrorMessage, FormLabel, Input, useToast } from "@chakra-ui/react"
import { useCreateEmployee } from "@/hooks/useCreateEmployee"
import { IEmployees } from "@/models/interfaces/employee"

export const employeeCreation = (data: IEmployees) => {
    return useCreateEmployee(data)
}

function EmployeeForm() {
    const toast = useToast()
    const {  
        handleSubmit, 
        register, 
        formState: {
        errors,
    }} = useForm<z.infer<typeof employeeSchema>>({
        defaultValues: {
            name: '',
            actions: '',
            charge: '',
            department: ''
        },
        resolver: zodResolver(employeeSchema)
    })

    const onSubmit: SubmitHandler<IEmployees> = (data) => {
        employeeCreation(data).then(res => toast({
            title: "Sucesso",
            description: "Funcionário cadastrado com sucesso",
            status: "success",
            duration: 2000
        })).catch(error => {
            toast({
            title: "Erro",
            description: error.response.data.message,
            status: "error",
            duration: 2000
        })})
    }

    return(
        <form className="flex flex-col gap-3 border rounded-md p-6" onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={ !!errors.name }>
                <FormLabel fontSize={12}>Nome:</FormLabel>
                <Input 
                    id="name"
                    {...register("name")}
                    placeholder="Nome"
                />
                <FormErrorMessage fontSize={12}>
                    { errors.name && errors.name.message }
                </FormErrorMessage>
            </FormControl>
            <FormControl  isInvalid={ !!errors.department }>
                <FormLabel fontSize={12}>Departamento:</FormLabel>
                <Input 
                    id="department"
                    {...register("department")}
                    placeholder="Departamento"
                />
                <FormErrorMessage fontSize={12}>
                    { errors.department && errors.department.message }
                </FormErrorMessage>
            </FormControl>
            <FormControl  isInvalid={ !!errors.charge }>
                <FormLabel fontSize={12}>Cargo:</FormLabel>
                <Input 
                    id="charge"
                    {...register("charge")}
                    placeholder="Cargo"
                />
                <FormErrorMessage fontSize={12}>
                    { errors.charge && errors.charge.message }
                </FormErrorMessage>
            </FormControl>
            <FormControl  isInvalid={ !!errors.actions }>
                <FormLabel fontSize={12}>Nome do funcionário:</FormLabel>
                <Input 
                    id="actions"
                    {...register("actions")}
                    placeholder="Actons"
                />
                <FormErrorMessage fontSize={12}>
                    { errors.actions && errors.actions.message }
                </FormErrorMessage>
            </FormControl>
            <Button mt={4} type="submit" backgroundColor="#DA0606" color="white" _hover={{ opacity: 0.8 }} _active="">
                Cadastrar
            </Button>
        </form>
    )
}

export default EmployeeForm