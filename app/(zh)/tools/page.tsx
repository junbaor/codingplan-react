/**
 * [INPUT]: 依赖 ArticlePage、JsonLd 与 toolsHub 集合页数据
 * [OUTPUT]: 对外提供静态生成的 /tools 工具集合列表页及完整 Metadata
 * [POS]: app/(zh)/tools 的集合根，与 [slug] 工具页构成「hub + 详情」标准结构
 * [PROTOCOL]: 变更时更新此头部，然后检查 AGENTS.md
 */
import type { Metadata } from 'next'
import { ArticlePage } from '@/src/components/ArticlePage'
import { JsonLd } from '@/src/components/JsonLd'
import { buildMetadata } from '@/src/data/metadata'
import { toolsHub } from '@/src/data/hubs'

export const metadata: Metadata = buildMetadata(toolsHub.seo)

export default function ToolsHub() {
  return (
    <>
      <JsonLd data={toolsHub.seo.jsonLd} />
      <ArticlePage page={toolsHub} />
    </>
  )
}
