/**
 * [INPUT]: 依赖 ArticlePage、JsonLd 与 modelsHub 集合页数据
 * [OUTPUT]: 对外提供静态生成的 /models 模型集合列表页及完整 Metadata
 * [POS]: app/(zh)/models 的集合根，与 [slug] 模型页构成「hub + 详情」标准结构
 * [PROTOCOL]: 变更时更新此头部，然后检查 AGENTS.md
 */
import type { Metadata } from 'next'
import { ArticlePage } from '@/src/components/ArticlePage'
import { JsonLd } from '@/src/components/JsonLd'
import { buildMetadata } from '@/src/data/metadata'
import { modelsHub } from '@/src/data/hubs'

export const metadata: Metadata = buildMetadata(modelsHub.seo)

export default function ModelsHub() {
  return (
    <>
      <JsonLd data={modelsHub.seo.jsonLd} />
      <ArticlePage page={modelsHub} />
    </>
  )
}
