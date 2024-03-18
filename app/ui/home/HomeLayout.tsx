import React from "react";
import { Footer } from '@/app/ui/home/Footer'
import { Header } from '@/app/ui/home/Header'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex-auto">{children}</main>
      <Footer />
    </>
  )
}
