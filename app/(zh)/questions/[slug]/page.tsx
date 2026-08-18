/**
 * [INPUT]: 依赖 Next.js 静态参数/404 能力、ArticlePage、JsonLd 与 questionSlugs 问题页数据索引
 * [OUTPUT]: 对外提供 /questions/[slug] 静态问题长文页（是什么/最便宜/哪个好）及逐页 Metadata
 * [POS]: app/(zh)/questions 的参数化入口，承接信息型与商业调研型问题查询
 * [PROTOCOL]: 变更时更新此头部，然后检查 AGENTS.md
 */
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArticlePage } from '@/src/components/ArticlePage'
import { JsonLd } from '@/src/components/JsonLd'
import { buildMetadata } from '@/src/data/metadata'
import { bestCodingPlan, cheapestCodingPlan, questionSlugs, whatIsCodingPlan } from '@/src/data/questions'

interface QuestionRouteProps {
  params: Promise<{ slug: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return questionSlugs.map((slug) => ({ slug }))
}

function getQuestion(slug: string) {
  if (slug === 'what-is-coding-plan') return whatIsCodingPlan
  if (slug === 'cheapest-coding-plan') return cheapestCodingPlan
  if (slug === 'best-coding-plan') return bestCodingPlan
  return undefined
}

export async function generateMetadata({ params }: QuestionRouteProps): Promise<Metadata> {
  const page = getQuestion((await params).slug)
  return page ? buildMetadata(page.seo) : {}
}

export default async function Question({ params }: QuestionRouteProps) {
  const page = getQuestion((await params).slug)
  if (!page) notFound()

  return (
    <>
      <JsonLd data={page.seo.jsonLd} />
      <ArticlePage page={page} />
    </>
  )
}
