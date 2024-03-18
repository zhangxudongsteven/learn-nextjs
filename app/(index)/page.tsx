import { CallToAction } from '@/app/ui/home/CallToAction'
import { Faqs } from '@/app/ui/home/Faqs'
import { Hero } from '@/app/ui/home/Hero'
import { Cases } from '@/app/ui/home/Cases'
import { Features } from '@/app/ui/home/Features'
import { Layout } from '@/app/ui/home/HomeLayout'

export default function Home() {
  return (
    <Layout>
      <Hero />
      {/*<PrimaryFeatures />*/}
      <Features />
      <Cases />
      <CallToAction />
      {/*<Reviews />*/}
      <Faqs />
    </Layout>
  )
}
