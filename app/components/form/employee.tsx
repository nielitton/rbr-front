'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { employeeSchema } from "@/models/employee.schema"
import { z } from "zod"
import { Button, FormControl, FormErrorMessage, FormLabel, Input, useToast, useUpdateEffect } from "@chakra-ui/react"
import { useCreateEmployee } from "@/hooks/useCreateEmployee"
import { IEmployees } from "@/models/interfaces/employee"
import { useEffect, useState } from "react"
import { useUpdateEmployee } from "@/hooks/useUpdateEmployee"
import { formatDate, formatDateToLocal } from "@/utils/dates"

type EmployeeFormProps = {
    dataRescued?: IEmployees;
    loading?: boolean
    createMode: 'create' | 'view' | 'update';
}

const employeeCreation = (data: IEmployees) => {
    return useCreateEmployee(data)
}

const employeeUpdate = (id: string, data: IEmployees) => {
    return useUpdateEmployee(id, data)
}

function EmployeeForm({ createMode, dataRescued }: EmployeeFormProps) {
    const [newCreateMode, setNewCreateMode] = useState<'create' | 'view' | 'update'>(createMode || 'create')
    const [formatedDate, setFormatedDate] = useState<string>(dataRescued?.admissionDate || '')

    const handleChangeCreateMode = (mode: 'create' | 'view' | 'update') => {
        setNewCreateMode(mode)
    }

    const toast = useToast()
    const {  
        handleSubmit, 
        register,
        setValue, 
        clearErrors,
        formState: {
        errors,
    }} = useForm<z.infer<typeof employeeSchema>>({
        defaultValues: {
            name: dataRescued?.name || '',
            admissionDate: dataRescued?.admissionDate || '',
            charge: dataRescued?.charge || '',
            department: dataRescued?.department || ''
        },
        resolver: zodResolver(employeeSchema)
    })

    const onSubmit: SubmitHandler<IEmployees> = (data) => {
        if(newCreateMode === 'create') {
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
        if(newCreateMode === 'update') {
            employeeUpdate(dataRescued?._id || '', data).then(res => toast({
                title: "Sucesso",
                description: "Funcionário atualizado com sucesso",
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
    }

    const handleAdmissionDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const formattedValue = formatDate(value);
        setFormatedDate(formattedValue);

        if (errors.admissionDate) {
            clearErrors('admissionDate');
        }
    };

    useEffect(() => {
        if (newCreateMode !== 'create') {
            setValue('name', dataRescued?.name || '');
            setValue('department', dataRescued?.department || '');
            setValue('charge', dataRescued?.charge || '');
            setValue('admissionDate', formatDateToLocal(dataRescued?.admissionDate || '') || '');
        }
    }, [dataRescued, newCreateMode, formatedDate, setValue]);

    return(
        <form className="flex flex-col gap-3 border rounded-md p-6" onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={ !!errors.name }>
                <FormLabel fontSize={12}>Nome:</FormLabel>
                <Input 
                    id="name"
                    {...register("name")}
                    placeholder="Nome"
                    disabled={newCreateMode === 'view'}
                />
                <FormErrorMessage fontSize={12}>
                    { errors.name && errors.name.message }
                </FormErrorMessage>
            </FormControl>
            <FormControl  isInvalid={ !!errors.charge }>
                <FormLabel fontSize={12}>Cargo:</FormLabel>
                <Input 
                    id="charge"
                    {...register("charge")}
                    placeholder="Cargo"
                    disabled={newCreateMode === 'view'}
                />
                <FormErrorMessage fontSize={12}>
                    { errors.charge && errors.charge.message }
                </FormErrorMessage>
            </FormControl>
            <FormControl  isInvalid={ !!errors.department }>
                <FormLabel fontSize={12}>Departamento:</FormLabel>
                <Input 
                    id="department"
                    {...register("department")}
                    placeholder="Departamento"
                    disabled={newCreateMode === 'view'}
                />
                <FormErrorMessage fontSize={12}>
                    { errors.department && errors.department.message }
                </FormErrorMessage>
            </FormControl>
            <FormControl  isInvalid={ !!errors.admissionDate }>
                <FormLabel fontSize={12}>Data de admissão:</FormLabel>
                <Input 
                    id="admissionDate"
                    {...register("admissionDate")}
                    placeholder="Data de admissão"
                    disabled={newCreateMode === 'view'}
                    value={formatedDate}
                    onChange={handleAdmissionDateChange}
                />
                <FormErrorMessage fontSize={12}>
                    { errors.admissionDate && errors.admissionDate.message }
                </FormErrorMessage>
            </FormControl>
            {
                newCreateMode === 'update' ?
                <div className="flex justify-between">
                    <Button type="button" onClick={() => handleChangeCreateMode('view')} mt={4} backgroundColor="#DA0606" color="white" _hover={{ opacity: 0.8 }} _active="">Cancelar</Button>
                    <Button type="submit" mt={4} backgroundColor="#DA0606" color="white" _hover={{ opacity: 0.8 }} _active="">Salvar</Button>
                </div>
                 : 
                <Button onClick={() => newCreateMode === 'view' && handleChangeCreateMode('update')} type={ newCreateMode === 'create' ? 'submit' : 'button' } mt={4} backgroundColor="#DA0606" color="white" _hover={{ opacity: 0.8 }} _active="">
                    { newCreateMode === 'view' ? 'Editar' : 'Cadastrar' }
                </Button>
            }
            
        </form>
    )
}

export default EmployeeForm