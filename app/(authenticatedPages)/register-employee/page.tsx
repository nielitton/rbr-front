import EmployeeForm from "@/app/components/form/employee"

const RegisterEmployee = () => {
    return(
        <div className="flex flex-col gap-3 justify-center items-center  w-scree h-screen">
            <h1>Cadastrar Funcionário</h1>
            <EmployeeForm />
        </div>
    )
}

export default RegisterEmployee