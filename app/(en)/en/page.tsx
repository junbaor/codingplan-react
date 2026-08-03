/**
 * [INPUT]: 依赖 HomePage、JsonLd 与 enHome 类型化首页数据
 * [OUTPUT]: 对外提供静态生成的 /en 英文首页及完整 Metadata
 * [POS]: app/(en)/en 的页面入口，与中文首页通过 hreflang 互引
 * [PROTOCOL]: 变更时更新此头部，然后检查 AGENTS.md
 */
import type { Metadata } from 'next'
import { HomePage } from '@/src/components/HomePage'
import { JsonLd } from '@/src/components/JsonLd'
import { enHome } from '@/src/data/home'
import { buildMetadata } from '@/src/data/metadata'

export const metadata: Metadata = buildMetadata(enHome.seo)

export default function EnglishHome() {
  return (
    <>
      <JsonLd data={enHome.seo.jsonLd} />
      <HomePage data={enHome} />
    </>
  )
}
