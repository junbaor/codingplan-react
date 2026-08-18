/**
 * [INPUT]: 依赖 Next.js 静态参数/404 能力、ArticlePage、JsonLd 与 modelSlugs 模型页数据索引
 * [OUTPUT]: 对外提供 /models/[slug] 静态模型评测页（9 个旗舰模型）及逐页 Metadata
 * [POS]: app/(zh)/models 的参数化入口，承接「模型名 + 怎么样/价格」长尾查询
 * [PROTOCOL]: 变更时更新此头部，然后检查 AGENTS.md
 */
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArticlePage } from '@/src/components/ArticlePage'
import { JsonLd } from '@/src/components/JsonLd'
import { buildMetadata } from '@/src/data/metadata'
import { deepseekV4, doubaoSeed21Turbo, glm52, glm53, glm5Turbo, kimiK27, kimiK3, minimaxM3, modelSlugs, qwen35Plus } from '@/src/data/models'

interface ModelRouteProps {
  params: Promise<{ slug: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return modelSlugs.map((slug) => ({ slug }))
}

function getModel(slug: string) {
  if (slug === 'glm-5.3') return glm53
  if (slug === 'glm-5.2') return glm52
  if (slug === 'kimi-k3') return kimiK3
  if (slug === 'minimax-m3') return minimaxM3
  if (slug === 'doubao-seed-2.1-turbo') return doubaoSeed21Turbo
  if (slug === 'deepseek-v4') return deepseekV4
  if (slug === 'qwen3.5-plus') return qwen35Plus
  if (slug === 'kimi-k2.7') return kimiK27
  if (slug === 'glm-5-turbo') return glm5Turbo
  return undefined
}

export async function generateMetadata({ params }: ModelRouteProps): Promise<Metadata> {
  const page = getModel((await params).slug)
  return page ? buildMetadata(page.seo) : {}
}

export default async function Model({ params }: ModelRouteProps) {
  const page = getModel((await params).slug)
  if (!page) notFound()

  return (
    <>
      <JsonLd data={page.seo.jsonLd} />
      <ArticlePage page={page} />
    </>
  )
}
