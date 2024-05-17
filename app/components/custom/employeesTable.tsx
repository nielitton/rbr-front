import { IEmployees } from "@/models/interfaces/employee"
import { Table, TableContainer, Tbody, Td, Thead, Tr } from "@chakra-ui/react"

function EmployeeTable({ data }: { data: IEmployees[] | undefined }) {
    return(
        <TableContainer overflowY="scroll" height={250}>
            <Table size="sm" variant="simple">
                <Thead>
                    <Tr>
                        <Td>Nome</Td>
                        <Td>Cargo</Td>
                        <Td>Departamento</Td>
                        <Td>Ações</Td>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        data !== undefined && data.length > 1 ?
                            data.map((employee) => (
                                <Tr>
                                    <Td>{ employee.name }</Td>
                                    <Td>{ employee.charge }</Td>
                                    <Td>{ employee.department }</Td>
                                    <Td>{ employee.actions }</Td>
                                </Tr>
                            ))
                        : null
                    }
                </Tbody>
            </Table>
        </TableContainer>
    )
}

export { EmployeeTable }