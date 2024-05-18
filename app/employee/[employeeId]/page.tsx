'use client'

import EmployeeForm from "@/app/components/form/employee"
import { useGetOneEmployee } from "@/hooks/useGetOneEmployee"
import { Button, Link } from "@chakra-ui/react"
import { useQuery } from "react-query"

const employeeFinded = async (id: string) => {
    return await useGetOneEmployee(id)
}

const EmployeeDetailsAndUpdate = ({ params }: { params: { employeeId: string } }) => {

    const { data, isLoading } = useQuery({
        queryKey: ["employeeDetails", params.employeeId],
        queryFn: () => employeeFinded(params.employeeId)
    })

    return(
        <div className="flex flex-col gap-3 justify-center items-center  w-scree h-screen">
            <div className="flex flex-col gap-2 w-full p-4">
                <div className="flex items-center justify-center">
                    <Link href="/" _hover={{ textDecoration: "none" }}>
                        <Button display="flex" alignItems="center" height={8} mt={4} type="submit" backgroundColor="#DA0606" color="white" _hover={{ opacity: 0.8 }} _active="" size="sm" style={{ margin: 0 }}>Voltar</Button>
                    </Link>
                    <h1 className="w-full text-center">{data?.name}</h1>
                </div>
                <EmployeeForm loading={isLoading} createMode="view" dataRescued={data}/>
            </div>
        </div>
    )
}

export default EmployeeDetailsAndUpdate