
import { Metadata } from 'next';
import Image from "next/image";

export const metadata: Metadata = {
  title: 'ChatBot',
};

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 py-12 bg-gray-100 md:py-24 lg:py-36 dark:bg-gray-800 overflow-hidden">
      <div className="container flex flex-col items-center justify-center gap-4 text-center md:gap-10">
        <div className="space-y-3">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">扫码尝试</h1>
          <p
            className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            您可以将二维码打印在纸质产品说明书上，供您的客户扫码使用。
          </p>
        </div>
        <div className="flex flex-col gap-2 min-[400px]:flex-row">
          <Image
            alt="QR Code"
            width={144}
            height={144}
            src="/images/chatbot-manual-qr.png"
          />
        </div>
      </div>
    </div>
  )
}

