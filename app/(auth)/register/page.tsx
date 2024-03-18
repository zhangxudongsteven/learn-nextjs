import Link from 'next/link'

import { AuthLayout } from '@/components/homepage/AuthLayout'
import { Button } from '@/components/Button'
import { SelectField, TextField } from '@/components/Fields'
import { type Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign Up',
}

export default function Register() {
  return (
    <AuthLayout
      title="快速注册您的账号"
      subtitle={
        <>
          已经完成注册？请{' '}
          <Link href="/login" className="text-cyan-600">
            登录
          </Link>{' '}
          您的账号。
        </>
      }
    >
      <form>
        <div className="grid grid-cols-2 gap-6">
          <TextField
            className="col-span-full"
            label="如何称呼您"
            name="first_name"
            type="text"
            autoComplete="given-name"
            required
          />
          <TextField
            className="col-span-full"
            label="邮件"
            name="email"
            type="email"
            autoComplete="email"
            required
          />
          <TextField
            className="col-span-full"
            label="密码"
            name="password"
            type="password"
            autoComplete="new-password"
            required
          />
          <SelectField
            className="col-span-full"
            label="您如何了解我们的？"
            name="referral_source"
          >
            <option>商业活动</option>
            <option>合作伙伴</option>
            <option>社交媒体</option>
            <option>其它方式</option>
          </SelectField>
        </div>
        <Button type="submit" color="cyan" className="mt-8 w-full">
          快速注册
        </Button>
      </form>
    </AuthLayout>
  )
}
