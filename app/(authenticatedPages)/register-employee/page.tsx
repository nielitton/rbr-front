import EmployeeForm from "@/app/components/form/employee"
import { Button, Link } from "@chakra-ui/react"

const RegisterEmployee = () => {
    return(
        <div className="flex flex-col gap-3 justify-center items-center  w-scree h-screen">
            <div className="flex flex-col gap-2 w-full p-4">
                <div className="flex items-center justify-center">
                    <Link href="/" _hover={{ textDecoration: "none" }}>
                        <Button display="flex" alignItems="center" height={8} mt={4} type="submit" backgroundColor="#DA0606" color="white" _hover={{ opacity: 0.8 }} _active="" size="sm" style={{ margin: 0 }}>Voltar</Button>
                    </Link>
                    <h1 className="w-full text-center">Cadastrar Funcionário</h1>
                </div>
                <EmployeeForm />
            </div>
        </div>
    )
}

export default RegisterEmployee