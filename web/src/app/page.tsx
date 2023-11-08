import Link from 'next/link'

export default function Home() {
  return (
    <div className='w-full text-center'>
      <Link
      href='/empresas'
      >
        <button className='bg-blue-800 text-white p-2 rounded'>
        Empresas
        </button>
      </Link>
    </div>
  )
}
