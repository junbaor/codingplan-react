/**
 * [INPUT]: 依赖 Next.js 静态参数/404 能力、ArticlePage、JsonLd 与 compareSlugs 对比数据索引
 * [OUTPUT]: 对外提供 /compare/[slug] 静态对比页（当前 glm-vs-kimi）及逐页 Metadata
 * [POS]: app/(zh)/compare 的参数化入口，承接「A vs B」商业调研查询
 * [PROTOCOL]: 变更时更新此头部，然后检查 AGENTS.md
 */
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArticlePage } from '@/src/components/ArticlePage'
import { JsonLd } from '@/src/components/JsonLd'
import { buildMetadata } from '@/src/data/metadata'
import { compareSlugs, glmVsKimi } from '@/src/data/compares'

interface CompareRouteProps {
  params: Promise<{ slug: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return compareSlugs.map((slug) => ({ slug }))
}

function getCompare(slug: string) {
  if (slug === 'glm-vs-kimi') return glmVsKimi
  return undefined
}

export async function generateMetadata({ params }: CompareRouteProps): Promise<Metadata> {
  const page = getCompare((await params).slug)
  return page ? buildMetadata(page.seo) : {}
}

export default async function Compare({ params }: CompareRouteProps) {
  const page = getCompare((await params).slug)
  if (!page) notFound()

  return (
    <>
      <JsonLd data={page.seo.jsonLd} />
      <ArticlePage page={page} />
    </>
  )
}
