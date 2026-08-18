/**
 * [INPUT]: 依赖 ArticlePage、JsonLd 与 enBlogsHub 集合页数据
 * [OUTPUT]: 对外提供静态生成的 /en/blogs 英文博客列表页及完整 Metadata
 * [POS]: app/(en)/en/blogs 的集合根，英文文章的面包屑父级
 * [PROTOCOL]: 变更时更新此头部，然后检查 AGENTS.md
 */
import type { Metadata } from 'next'
import { ArticlePage } from '@/src/components/ArticlePage'
import { JsonLd } from '@/src/components/JsonLd'
import { enBlogsHub } from '@/src/data/hubs'
import { buildMetadata } from '@/src/data/metadata'

export const metadata: Metadata = buildMetadata(enBlogsHub.seo)

export default function EnArticlesHub() {
  return (
    <>
      <JsonLd data={enBlogsHub.seo.jsonLd} />
      <ArticlePage page={enBlogsHub} />
    </>
  )
}
