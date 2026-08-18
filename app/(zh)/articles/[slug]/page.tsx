/**
 * [INPUT]: 依赖 Next.js 静态参数/404 能力、ArticlePage、JsonLd 与 articles.ts 统一文章索引
 * [OUTPUT]: 对外提供 /articles/[slug] 静态文章页（对比/教程/问答共 7 篇）及逐页 Metadata
 * [POS]: app/(zh)/articles 的参数化入口，承接三类文章内容
 * [PROTOCOL]: 变更时更新此头部，然后检查 AGENTS.md
 */
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArticlePage } from '@/src/components/ArticlePage'
import { JsonLd } from '@/src/components/JsonLd'
import { articleSlugs, getArticle } from '@/src/data/articles'
import { buildMetadata } from '@/src/data/metadata'

interface ArticleRouteProps {
  params: Promise<{ slug: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return articleSlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: ArticleRouteProps): Promise<Metadata> {
  const page = getArticle((await params).slug)
  return page ? buildMetadata(page.seo) : {}
}

export default async function Article({ params }: ArticleRouteProps) {
  const page = getArticle((await params).slug)
  if (!page) notFound()

  return (
    <>
      <JsonLd data={page.seo.jsonLd} />
      <ArticlePage page={page} />
    </>
  )
}
