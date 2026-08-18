/**
 * [INPUT]: 依赖 ArticlePage、JsonLd 与 dealsPage 类型化数据
 * [OUTPUT]: 对外提供静态生成的 /deals 邀请码与优惠汇总页及完整 Metadata
 * [POS]: app/(zh) 的交易意图入口，被全站页脚与详情页相关链接引用
 * [PROTOCOL]: 变更时更新此头部，然后检查 AGENTS.md
 */
import type { Metadata } from 'next'
import { ArticlePage } from '@/src/components/ArticlePage'
import { JsonLd } from '@/src/components/JsonLd'
import { buildMetadata } from '@/src/data/metadata'
import { dealsPage } from '@/src/data/deals'

export const metadata: Metadata = buildMetadata(dealsPage.seo)

export default function Deals() {
  return (
    <>
      <JsonLd data={dealsPage.seo.jsonLd} />
      <ArticlePage page={dealsPage} />
    </>
  )
}
