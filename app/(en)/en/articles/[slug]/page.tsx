/**
 * [INPUT]: 依赖 Next.js 静态参数/404 能力、ArticlePage、JsonLd 与 articles.ts 英文文章索引
 * [OUTPUT]: 对外提供 /en/articles/[slug] 静态英文文章页及逐页 Metadata
 * [POS]: app/(en)/en/articles 的参数化入口，承接英文对比/教程内容
 * [PROTOCOL]: 变更时更新此头部，然后检查 AGENTS.md
 */
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArticlePage } from '@/src/components/ArticlePage'
import { JsonLd } from '@/src/components/JsonLd'
import { enArticleSlugs, getEnArticle } from '@/src/data/articles'
import { buildMetadata } from '@/src/data/metadata'

interface EnArticleRouteProps {
  params: Promise<{ slug: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return enArticleSlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: EnArticleRouteProps): Promise<Metadata> {
  const page = getEnArticle((await params).slug)
  return page ? buildMetadata(page.seo) : {}
}

export default async function EnArticle({ params }: EnArticleRouteProps) {
  const page = getEnArticle((await params).slug)
  if (!page) notFound()

  return (
    <>
      <JsonLd data={page.seo.jsonLd} />
      <ArticlePage page={page} />
    </>
  )
}
