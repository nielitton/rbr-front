import { useMutation, useQueryClient } from "react-query";
import { useDeleteEmployee } from "@/hooks/useDeleteEmployee";
import { IEmployees } from "@/models/interfaces/employee";
import { IconButton, Menu, MenuButton, MenuItem, MenuList, Spinner, Table, TableContainer, Tbody, Td, Thead, Tr, useToast } from "@chakra-ui/react";
import { EllipsisVertical, Eye, Pen, Trash } from "lucide-react";
import { formatDateToLocal } from "@/utils/dates";

function EmployeeTable({ data, loading }: { data: { employees: IEmployees[], count: number } | undefined, loading: boolean }) {
    const toast = useToast();
    const queryClient = useQueryClient();

    const deleteMutation = useMutation(useDeleteEmployee, {
        onSuccess: () => {
            queryClient.invalidateQueries("employees");
            toast({
                title: "Funcionário deletado!",
                status: "success",
            });
        },
        onError: (error: any) => {
            toast({
                title: "Erro!",
                status: "error",
                description: error.message || "Ocorreu um erro ao deletar o funcionário.",
            });
        },
    });

    const handleDeleteEmployee = (id: string) => {
        deleteMutation.mutate(id);
    };

    return (
        <TableContainer overflowY="scroll" height={250}>
            {loading ? (
                <div className="flex items-center justify-center">
                    <Spinner />
                </div>
            ) : (
                <Table size="sm" variant="simple">
                    <Thead>
                        <Tr>
                            <Td fontWeight="700">Nome</Td>
                            <Td fontWeight="700">Cargo</Td>
                            <Td fontWeight="700">Departamento</Td>
                            <Td fontWeight="700" textAlign="center">Ações</Td>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data?.employees.map((employee) => (
                            <Tr key={employee._id}>
                                <Td>{employee.name}</Td>
                                <Td>{employee.charge}</Td>
                                <Td>{employee.department}</Td>
                                <Td textAlign="center">
                                    <Menu>
                                        <MenuButton 
                                            as={IconButton}
                                            icon={<EllipsisVertical className="w-4 h-4 hover:text-[#DA0606]" />}
                                            border="none"
                                            _hover={{
                                                backgroundColor: "transparent"
                                            }}
                                            _active={{
                                                color: "#DA0606",
                                                backgroundColor: "transparent"
                                            }}
                                            backgroundColor="transparent"
                                        />
                                        <MenuList>
                                            <MenuItem as="a" href={`/employee/${employee._id}`} icon={<Pen className="w-4 h-4"/>}>
                                                Editar
                                            </MenuItem>
                                            <MenuItem onClick={() => handleDeleteEmployee(employee._id || '')} icon={<Trash className="text-[#DA0606] cursor-pointer w-4 h-4" /> }>
                                                Excluir   
                                            </MenuItem>
                                        </MenuList>
                                    </Menu>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            )}
        </TableContainer>
    );
}

export { EmployeeTable };
