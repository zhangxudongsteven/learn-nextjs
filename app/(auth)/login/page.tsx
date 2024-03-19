import Link from 'next/link'

import { AuthLayout } from '@/app/ui/auth/AuthLayout'

import LoginForm from '@/app/ui/login-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In',
}

export default function LoginPage() {
  return (
      <AuthLayout
          title="欢迎回来，请登录"
          subtitle={
            <>
              {/*还没有账号？现在{' '}*/}
              {/*<Link href="/register" className="text-cyan-600">*/}
              {/*  注册*/}
              {/*</Link>{' '}*/}
              {/*来联系我们。*/}
              本网站暂不支持注册，请联系商务开通账号体验。
            </>
          }
      >
        <LoginForm />
      </AuthLayout>
  );
}