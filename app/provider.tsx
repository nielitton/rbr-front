// app/providers.tsx
'use client'

import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from 'react-query'

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
    
  return (
    <QueryClientProvider client={queryClient}>
        <ChakraProvider>
          {children}
        </ChakraProvider>
    </QueryClientProvider>
  )
}