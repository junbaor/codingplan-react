/**
 * [INPUT]: 依赖 Next.js 静态参数/404 能力、ArticlePage、JsonLd 与 enCompareSlugs 英文对比数据
 * [OUTPUT]: 对外提供 /en/compare/[slug] 静态英文对比页（当前 claude-vs-glm）及逐页 Metadata
 * [POS]: app/(en)/en/compare 的参数化入口，承接英文「A vs B」查询
 * [PROTOCOL]: 变更时更新此头部，然后检查 AGENTS.md
 */
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArticlePage } from '@/src/components/ArticlePage'
import { JsonLd } from '@/src/components/JsonLd'
import { buildMetadata } from '@/src/data/metadata'
import { claudeVsGlm, enCompareSlugs } from '@/src/data/compares'

interface EnCompareRouteProps {
  params: Promise<{ slug: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return enCompareSlugs.map((slug) => ({ slug }))
}

function getEnCompare(slug: string) {
  if (slug === 'claude-vs-glm') return claudeVsGlm
  return undefined
}

export async function generateMetadata({ params }: EnCompareRouteProps): Promise<Metadata> {
  const page = getEnCompare((await params).slug)
  return page ? buildMetadata(page.seo) : {}
}

export default async function EnCompare({ params }: EnCompareRouteProps) {
  const page = getEnCompare((await params).slug)
  if (!page) notFound()

  return (
    <>
      <JsonLd data={page.seo.jsonLd} />
      <ArticlePage page={page} />
    </>
  )
}
