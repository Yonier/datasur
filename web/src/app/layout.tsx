import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'

const inter = Inter({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Datasur',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={
        `${inter.className} bg-white`
      }>
        <div className='mx-auto sm:px-6 max-w-6xl flex flex-col gap-2 h-screen my-4'>
          <div className='text-center'>
            <Link href='/'>
              <h5 className='text-4xl font-bold text-blue-900'>Datasur</h5>
            </Link>
          </div>
          {children}
        </div>
      </body>
    </html>
  )
}
