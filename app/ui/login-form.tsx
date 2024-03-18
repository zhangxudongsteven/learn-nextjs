'use client';

import { lusitana } from '@/app/ui/fonts';
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
// import { Button } from './button';
import { Button } from '@/app/ui/common/Button'
import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '@/app/lib/actions';
import {TextField} from "@/app/ui/common/Fields";

export default function LoginForm() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
      <div>
        <form action={dispatch} className="space-y-3">
            {/*<h1 className={`${lusitana.className} mb-3 text-2xl`}>*/}
            {/*  Please log in to continue.*/}
            {/*</h1>*/}
            <div className="w-full">
              <div>
                <label
                    className="mb-3 mt-5 block text-s font-medium text-gray-900"
                    htmlFor="email"
                >
                  邮箱
                </label>
                <div className="relative">
                  <input
                      className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                      id="email"
                      type="email"
                      name="email"
                      placeholder="请输入邮箱地址"
                      required
                  />
                  <AtSymbolIcon
                      className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
                </div>
              </div>
              <div className="mt-4">
                <label
                    className="mb-3 mt-5 block text-s font-medium text-gray-900"
                    htmlFor="password"
                >
                  密码
                </label>
                <div className="relative">
                  <input
                      className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                      id="password"
                      type="password"
                      name="password"
                      placeholder="请输入密码"
                      required
                      minLength={6}
                  />
                  <KeyIcon
                      className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
                </div>
              </div>
            </div>
            <LoginButton/>
            <div
                className="flex h-8 items-end space-x-1"
                aria-live="polite"
                aria-atomic="true"
            >
              {errorMessage && (
                  <>
                    <ExclamationCircleIcon className="h-5 w-5 text-red-500"/>
                    <p className="text-sm text-red-500">{errorMessage}</p>
                  </>
              )}
            </div>
        </form>
      </div>
  );
}

function LoginButton() {
  const {pending} = useFormStatus();

  return (
      <Button color="cyan" className="mt-8 w-full" aria-disabled={pending}>
          登录 <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50"/>
      </Button>
  );
}
