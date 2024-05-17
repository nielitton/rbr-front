'use client'

import { useEffect, useState } from "react";
import { EmployeeTable } from "./components/custom/employeesTable";
import { IEmployees } from "@/models/interfaces/employee";
import { useListEmployees } from "@/hooks/useListEmployees";
import { useQuery } from "react-query";
import { Button, Link } from "@chakra-ui/react";

export const listEmployees = (sort: boolean) => {
  return useListEmployees(sort)
}

export default function Home() {
  const [sorted, setSorted] = useState<boolean>(true)

  const { data } = useQuery({
    queryKey: ["employees"],
    queryFn: () => listEmployees(sorted)
  })

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex flex-col gap-3 w-[95%]">
        <div className="flex items-center justify-end border rounded-md p-3">
          <h1 className="w-full text-center">Lista de funcionários</h1>
          <Link _hover={{ textDecoration: "none" }} href="/register-employee">
            <Button className="m-0" display="flex" alignItems="center" height={8} mt={4} type="submit" backgroundColor="#DA0606" color="white" _hover={{ opacity: 0.8 }} _active="" size="sm" style={{ margin: 0 }}>Cadastrar novo</Button>
          </Link>
        </div>
        <div className="p-4 w-full h-[50%] border rounded-md">
          <EmployeeTable data={data} />
        </div>
      </div>
    </main>
  );
}
