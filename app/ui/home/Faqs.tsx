
import { Container } from '@/app/ui/common/Container'

const faqs = [
  [
    {
      question: '腾天科技的愿景是什么？',
      answer:
        '腾天科技以“AI 改变生活”为愿景，致力于通过丰富而强大的技术生态提供全方位的人工智能技术服务。',
    },
    {
      question: '腾天科技的团队背景如何？',
      answer:
        '我们的团队成员来自于国内知名的人工智能公司，拥有多年的AI技术研发与项目实施经验。',
    },
    {
      question: '腾天科技可以提供哪些 AI 技术服务？',
      answer:
        '我们提供包括AI咨询、开发、集成、维护等全链条的人工智能技术服务，特别在AI问答、语音、图片生成、数字人、AI Agent等方面提供解决方案。',
    },
  ],
  [
    {
      question: '如何使用腾天科技的AI问答服务？',
      answer:
        '我们提供云服务或本地化部署的AI问答解决方案，可以结合客户的私有知识库、QA模板和数据库等内部数据。根据客户的使用场景，我们还提供模型调试优化服务。',
    },
    {
      question: '腾天科技的AI问答服务可以部署在哪些平台？',
      answer:
        '我们的AI问答服务可以接入企业微信、钉钉、飞书、网页、小程序、APP等各种实际使用场景。',
    },
    {
      question: '腾天科技提供哪些语音技术服务？',
      answer:
        '我们提供语音识别和语音合成的云服务或本地化部署解决方案，并支持声音定制。',
    },
  ],
  [
    {
      question: '腾天科技在图片生成方面有哪些能力？',
      answer:
        '我们提供文字生成图片的云服务或本地化部署解决方案，并可根据客户需求定制图片风格。',
    },
    {
      question: '腾天科技的数字人解决方案有哪些应用场景？',
      answer:
        '我们的数字人解决方案适用于需要虚拟形象参与的陈述、对话和交互等场景。',
    },
    {
      question: '腾天科技的AI Agent解决方案如何帮助企业？',
      answer:
        '我们的AI Agent解决方案结合客户的实际业务需求，与OA、ERP等系统集成，借助人工智能技术实现降本增效，适用于AI审批、AI邮件处理、AI记账等场景。',
    },
  ],
]

export function Faqs() {
  return (
    <section
      id="faqs"
      aria-labelledby="faqs-title"
      className="border-t border-gray-200 py-20 sm:py-32"
    >
      <Container>
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2
            id="faqs-title"
            className="text-3xl font-medium tracking-tight text-gray-900"
          >
            常见问题
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            如果您寻求合作或有任何其它问题，欢迎登录本网站留下您的信息、关注我们的公众号或者通过商务邮箱{' '}
            <a className="text-gray-900 underline">
              bd@tengtiankeji.com
            </a>
            {' '}联系我们。
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:max-w-none lg:grid-cols-3"
        >
          {faqs.map((column, columnIndex) => (
            <li key={columnIndex}>
              <ul role="list" className="space-y-10">
                {column.map((faq, faqIndex) => (
                  <li key={faqIndex}>
                    <h3 className="text-lg font-semibold leading-6 text-gray-900">
                      {faq.question}
                    </h3>
                    <p className="mt-4 text-sm text-gray-700">{faq.answer}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
