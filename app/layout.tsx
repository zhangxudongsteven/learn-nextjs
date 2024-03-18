import React from "react";
import '@/app/ui/tailwind.css'
import { inter } from '@/app/ui/fonts';

import clsx from 'clsx'

import { type Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://turingue.com'),
  title: {
    template: '%s | 腾天科技',
    default: '腾天科技 - AI改变生活',
  },
  description: '用AI技术帮助我们日常工作、生活的方方面面，积少成多、迈向AI时代。',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <html
          lang="en"
          className={clsx('h-full bg-gray-50 antialiased', inter.variable)}
      >
      <body className="flex h-full flex-col">
      <div className="flex min-h-full flex-col">{children}</div>
      </body>
      </html>
  )
}
