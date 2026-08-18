/**
 * [INPUT]: 依赖 ArticlePage、JsonLd 与 changelogPage 类型化数据
 * [OUTPUT]: 对外提供静态生成的 /changelog 变更记录页及完整 Metadata
 * [POS]: app/(zh) 的时效意图入口，承接涨价/上新类查询并导向详情页
 * [PROTOCOL]: 变更时更新此头部，然后检查 AGENTS.md
 */
import type { Metadata } from 'next'
import { ArticlePage } from '@/src/components/ArticlePage'
import { JsonLd } from '@/src/components/JsonLd'
import { buildMetadata } from '@/src/data/metadata'
import { changelogPage } from '@/src/data/changelog'

export const metadata: Metadata = buildMetadata(changelogPage.seo)

export default function Changelog() {
  return (
    <>
      <JsonLd data={changelogPage.seo.jsonLd} />
      <ArticlePage page={changelogPage} />
    </>
  )
}
