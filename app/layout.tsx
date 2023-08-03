import './globals.css'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import Navbar from './components/navbar/Navbar'
import ClientOnly from './components/ClientOnly'
import Modal from './components/Modals/Modal'
import RegisterModel from './components/Modals/RegisterModel'

const font = Nunito({
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Airbnb',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <RegisterModel />
          <Navbar />
        </ClientOnly>
        {children}
      </body>
    </html>
  )
}
