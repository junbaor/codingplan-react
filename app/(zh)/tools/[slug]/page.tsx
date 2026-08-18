/**
 * [INPUT]: 依赖 Next.js 静态参数/404 能力、ArticlePage、JsonLd 与 toolSlugs 工具页数据索引
 * [OUTPUT]: 对外提供 /tools/[slug] 静态工具页（Claude Code/Codex/OpenCode/Cursor/Cline/Roo Code）及逐页 Metadata
 * [POS]: app/(zh)/tools 的参数化入口，承接「工具名 + 价格/配置」查询并导向平台详情
 * [PROTOCOL]: 变更时更新此头部，然后检查 AGENTS.md
 */
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArticlePage } from '@/src/components/ArticlePage'
import { JsonLd } from '@/src/components/JsonLd'
import { buildMetadata } from '@/src/data/metadata'
import { claudeCodeTool, clineTool, codexTool, cursorTool, opencodeTool, rooCodeTool, toolSlugs } from '@/src/data/tools'

interface ToolRouteProps {
  params: Promise<{ slug: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return toolSlugs.map((slug) => ({ slug }))
}

function getTool(slug: string) {
  if (slug === 'claude-code') return claudeCodeTool
  if (slug === 'codex') return codexTool
  if (slug === 'opencode') return opencodeTool
  if (slug === 'cursor') return cursorTool
  if (slug === 'cline') return clineTool
  if (slug === 'roo-code') return rooCodeTool
  return undefined
}

export async function generateMetadata({ params }: ToolRouteProps): Promise<Metadata> {
  const page = getTool((await params).slug)
  return page ? buildMetadata(page.seo) : {}
}

export default async function Tool({ params }: ToolRouteProps) {
  const page = getTool((await params).slug)
  if (!page) notFound()

  return (
    <>
      <JsonLd data={page.seo.jsonLd} />
      <ArticlePage page={page} />
    </>
  )
}
