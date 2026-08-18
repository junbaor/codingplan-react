/**
 * [INPUT]: 依赖 ArticlePage、JsonLd 与 articlesHub 集合页数据
 * [OUTPUT]: 对外提供静态生成的 /articles 文章中心列表页及完整 Metadata
 * [POS]: app/(zh)/articles 的集合根，面包屑父级与文章权重汇聚点
 * [PROTOCOL]: 变更时更新此头部，然后检查 AGENTS.md
 */
import type { Metadata } from 'next'
import { ArticlePage } from '@/src/components/ArticlePage'
import { JsonLd } from '@/src/components/JsonLd'
import { buildMetadata } from '@/src/data/metadata'
import { articlesHub } from '@/src/data/hubs'

export const metadata: Metadata = buildMetadata(articlesHub.seo)

export default function ArticlesHub() {
  return (
    <>
      <JsonLd data={articlesHub.seo.jsonLd} />
      <ArticlePage page={articlesHub} />
    </>
  )
}
