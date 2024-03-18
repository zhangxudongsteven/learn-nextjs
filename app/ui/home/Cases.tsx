'use client'

import { Container } from '@/app/ui/common/Container'

export function Cases() {
  return (
    <section
      id="cases"
      aria-labelledby="cases-title"
      className="border-t border-gray-200 bg-gray-100 py-20 sm:py-32"
    >
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="cases-title"
            className="text-3xl font-medium tracking-tight text-gray-900"
          >
            案例展示
          </h2>
          <p className="mt-2 text-lg text-gray-600">
             独立产品 & 项目案例
          </p>
          <p className="mt-2 text-lg text-gray-600">
            - 敬请期待 -
          </p>
        </div>
      </Container>
    </section>
  )
}
