/**
 * [INPUT]: 依赖 Next.js 静态参数/404 能力、ArticlePage、JsonLd 与 guideSlugs 教程数据索引
 * [OUTPUT]: 对外提供 /guides/[slug] 静态教程页（GLM/Kimi/火山三篇）及逐页 Metadata
 * [POS]: app/(zh)/guides 的参数化入口，承接「claude code 配置 XX」教程查询
 * [PROTOCOL]: 变更时更新此头部，然后检查 AGENTS.md
 */
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArticlePage } from '@/src/components/ArticlePage'
import { JsonLd } from '@/src/components/JsonLd'
import { buildMetadata } from '@/src/data/metadata'
import { claudeCodeWithGlm, claudeCodeWithKimi, claudeCodeWithVolcengine, guideSlugs } from '@/src/data/guides'

interface GuideRouteProps {
  params: Promise<{ slug: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return guideSlugs.map((slug) => ({ slug }))
}

function getGuide(slug: string) {
  if (slug === 'claude-code-with-glm') return claudeCodeWithGlm
  if (slug === 'claude-code-with-kimi') return claudeCodeWithKimi
  if (slug === 'claude-code-with-volcengine') return claudeCodeWithVolcengine
  return undefined
}

export async function generateMetadata({ params }: GuideRouteProps): Promise<Metadata> {
  const page = getGuide((await params).slug)
  return page ? buildMetadata(page.seo) : {}
}

export default async function Guide({ params }: GuideRouteProps) {
  const page = getGuide((await params).slug)
  if (!page) notFound()

  return (
    <>
      <JsonLd data={page.seo.jsonLd} />
      <ArticlePage page={page} />
    </>
  )
}
