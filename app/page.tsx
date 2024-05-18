'use client'

import { useState } from "react";
import { EmployeeTable } from "./components/custom/employeesTable";
import { useListEmployees } from "@/hooks/useListEmployees";
import { useQuery } from "react-query";
import { Button, Input, Link } from "@chakra-ui/react";
import { ArrowUp01, ArrowUp10, ArrowUpAZ, ArrowUpZA } from "lucide-react";

export const listEmployees = (sort: string, search: string) => {
  return useListEmployees(sort, search)
}

export default function Home() {
  const [nameToSearch, setNameToSearch] = useState<string>('')
  const [sorted, setSorted] = useState<string>('')

  const { data, isLoading } = useQuery({
    queryKey: ["employees", sorted, nameToSearch],
    queryFn: () => listEmployees(sorted, nameToSearch)
  })

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex flex-col gap-3 w-[95%]">
        <div className="flex items-center justify-center border rounded-md p-3 flex-wrap gap-3">
          <h1 className="w-full text-center">Lista de funcionários</h1>
          <div className="flex justify-center w-full mr-4">
            <Input 
              placeholder="Pesquise o nome"
              width="80%"
              height={10}
              onChange={(e) => setNameToSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={() => setSorted(sorted === "true" ? "false" : "true")} display="flex" alignItems="center" height={10} mt={4} type="submit" backgroundColor="#DA0606" color="white" _hover={{ opacity: 0.8 }} _active="" size="sm" style={{ margin: 0 }}>
              {
                sorted === "true" ? <ArrowUpZA /> : <ArrowUpAZ /> 
              }
            </Button>
            <Link _hover={{ textDecoration: "none" }} href="/register-employee">
              <Button display="flex" alignItems="center" height={10} mt={4} type="submit" backgroundColor="#DA0606" color="white" _hover={{ opacity: 0.8 }} _active="" size="sm" style={{ margin: 0 }}>Cadastrar novo</Button>
            </Link>
          </div>
        </div>
        <div className="p-4 w-full h-[50%] border rounded-md">
          <EmployeeTable loading={isLoading} data={data} />
          <h1 className="w-full flex items-center justify-center mt-5">Quantidade de funcionários: {data?.count}</h1>
        </div>
      </div>
    </main>
  );
}
