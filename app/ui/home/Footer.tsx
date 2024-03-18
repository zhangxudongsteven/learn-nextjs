import Image from 'next/image'
import Link from 'next/link'

// import { Button } from '@/components/Button'
import { Container } from '@/app/ui/common/Container'
// import { TextField } from '@/components/Fields'
import { Logomark } from '@/app/ui/svg/Logo'
import { NavLinks } from '@/app/ui/common/NavLinks'
// import qrCode from '@/images/qr-code.svg'

// function QrCodeBorder(props: React.ComponentPropsWithoutRef<'svg'>) {
//   return (
//     <svg viewBox="0 0 96 96" fill="none" aria-hidden="true" {...props}>
//       <path
//         d="M1 17V9a8 8 0 0 1 8-8h8M95 17V9a8 8 0 0 0-8-8h-8M1 79v8a8 8 0 0 0 8 8h8M95 79v8a8 8 0 0 1-8 8h-8"
//         strokeWidth="2"
//         strokeLinecap="round"
//       />
//     </svg>
//   )
// }

export function Footer() {
  return (
    <footer className="border-t border-gray-200">
      <Container>
        <div className="flex flex-col items-start justify-between gap-y-12 pb-6 pt-16 lg:flex-row lg:items-center lg:py-16">
          <div>
            <div className="flex items-center text-gray-900">
              <Logomark className="h-10 w-10 flex-none fill-cyan-500" />
              <div className="ml-4">
                <p className="text-base font-semibold">腾天科技</p>
                <p className="mt-1 text-sm">用 AI 技术帮助我们日常工作、生活的方方面面，积少成多、迈向 AI 时代。</p>
              </div>
            </div>
            <nav className="hidden mt-11 md:flex md:gap-8">
              <NavLinks />
            </nav>
          </div>
          {/*<div className="group relative -mx-4 flex items-center self-stretch p-4 transition-colors hover:bg-gray-100 sm:self-auto sm:rounded-2xl lg:mx-0 lg:self-auto lg:p-6">*/}
          {/*  <div className="relative flex h-24 w-24 flex-none items-center justify-center">*/}
          {/*    <QrCodeBorder className="absolute inset-0 h-full w-full stroke-gray-300 transition-colors group-hover:stroke-cyan-500" />*/}
          {/*    <Image src={qrCode} alt="" unoptimized />*/}
          {/*  </div>*/}
          {/*  <div className="ml-8 lg:w-64">*/}
          {/*    <p className="text-base font-semibold text-gray-900">*/}
          {/*      <Link href="#">*/}
          {/*        <span className="absolute inset-0 sm:rounded-2xl" />*/}
          {/*        Download the app*/}
          {/*      </Link>*/}
          {/*    </p>*/}
          {/*    <p className="mt-1 text-sm text-gray-700">*/}
          {/*      Scan the QR code to download the app from the App Store.*/}
          {/*    </p>*/}
          {/*  </div>*/}
          {/*</div>*/}
        </div>
        <div className="flex flex-col items-center border-t border-gray-200 pb-12 pt-8 md:flex-row-reverse md:justify-between md:pt-6">
          {/*<form className="flex w-full justify-center md:w-auto">*/}
          {/*  <TextField*/}
          {/*    type="email"*/}
          {/*    aria-label="Email address"*/}
          {/*    placeholder="Email address"*/}
          {/*    autoComplete="email"*/}
          {/*    required*/}
          {/*    className="w-60 min-w-0 shrink"*/}
          {/*  />*/}
          {/*  <Button type="submit" color="cyan" className="ml-4 flex-none">*/}
          {/*    <span className="hidden lg:inline">Join our newsletter</span>*/}
          {/*    <span className="lg:hidden">Join newsletter</span>*/}
          {/*  </Button>*/}
          {/*</form>*/}
          <div className="w-full mt-6 text-sm text-center text-gray-500 md:mt-0">
            <p className="m-0 text-cyan-600">
              Copyright &copy; {new Date().getFullYear()} 腾天科技有限公司 All Rights Reserved
            </p>
            <a href="https://beian.miit.gov.cn/#/Integrated/index"
               className="m-0 text-cyan-600 no-underline hover:text-cyan-900 cursor-pointer">
                京ICP备2023027010号
            </a>
          </div>
        </div>
      </Container>
    </footer>
  )
}
