import { Metadata } from 'next'
import TableEmpresas from '@/components/Table/Empresas'

export const metadata: Metadata = {
  title: 'Empresas'
}

export default function Empresas() {
  return (
    <TableEmpresas/>
  )
}
