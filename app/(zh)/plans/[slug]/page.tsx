/**
 * [INPUT]: 依赖 Next.js 静态参数/404 能力、PlanPage、JsonLd 与套餐数据索引
 * [OUTPUT]: 对外提供八个 /plans/[slug] 静态详情页及逐页 Metadata
 * [POS]: app/(zh)/plans 的参数化页面入口，以单一模板覆盖全部套餐
 * [PROTOCOL]: 变更时更新此头部，然后检查 AGENTS.md
 */
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { JsonLd } from '@/src/components/JsonLd'
import { PlanPage } from '@/src/components/PlanPage'
import { buildMetadata } from '@/src/data/metadata'
import { getPlan, planSlugs } from '@/src/data/plans'

interface PlanRouteProps {
  params: Promise<{ slug: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return planSlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PlanRouteProps): Promise<Metadata> {
  const plan = getPlan((await params).slug)
  return plan ? buildMetadata(plan.seo) : {}
}

export default async function Plan({ params }: PlanRouteProps) {
  const plan = getPlan((await params).slug)
  if (!plan) notFound()

  return (
    <>
      <JsonLd data={plan.seo.jsonLd} />
      <PlanPage plan={plan} />
    </>
  )
}
