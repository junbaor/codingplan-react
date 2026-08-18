/**
 * [INPUT]: 依赖 Next.js 静态参数/404 能力、ArticlePage、JsonLd 与 blogs.ts 统一博客索引
 * [OUTPUT]: 对外提供 /blogs/[slug] 静态博客文章页（对比/教程/问答共 7 篇）及逐页 Metadata
 * [POS]: app/(zh)/blogs 的参数化入口，承接三类文章内容
 * [PROTOCOL]: 变更时更新此头部，然后检查 AGENTS.md
 */
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArticlePage } from '@/src/components/ArticlePage'
import { JsonLd } from '@/src/components/JsonLd'
import { blogSlugs, getBlog } from '@/src/data/blogs'
import { buildMetadata } from '@/src/data/metadata'

interface ArticleRouteProps {
  params: Promise<{ slug: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return blogSlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: ArticleRouteProps): Promise<Metadata> {
  const page = getBlog((await params).slug)
  return page ? buildMetadata(page.seo) : {}
}

export default async function Article({ params }: ArticleRouteProps) {
  const page = getBlog((await params).slug)
  if (!page) notFound()

  return (
    <>
      <JsonLd data={page.seo.jsonLd} />
      <ArticlePage page={page} />
    </>
  )
}
