// import { AppStoreLink } from '@/components/AppStoreLink'
import { CircleBackground } from '@/app/ui/home/CircleBackground'
import { Container } from '@/app/ui/common/Container'

export function CallToAction() {
  return (
    <section
      id="get-free-shares-today"
      className="relative overflow-hidden bg-gray-900 py-20 sm:py-28"
    >
      <div className="absolute left-20 top-1/2 -translate-y-1/2 sm:left-1/2 sm:-translate-x-1/2">
        <CircleBackground color="#fff" className="animate-spin-slower" />
      </div>
      <Container className="relative">
        <div className="mx-auto max-w-md sm:text-center">
          <h2 className="text-3xl font-medium tracking-tight text-white sm:text-4xl">
            开启您的 AI 转型之旅
          </h2>
          <p className="mt-4 text-lg text-gray-300">
            如果您寻求合作或有任何其它问题，欢迎登录本网站留下您的信息、关注我们的公众号或者通过商务邮箱 bd@tengtiankeji.com 联系我们。
          </p>

          <div className="mt-8 flex justify-center">
            {/*<AppStoreLink color="white" />*/}
            {/* 此处放置微信公众号二维码 */}
          </div>
        </div>
      </Container>
    </section>
  )
}
