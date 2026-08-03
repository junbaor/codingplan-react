/**
 * [INPUT]: 依赖 HomePage、JsonLd 与 zhHome 类型化首页数据
 * [OUTPUT]: 对外提供静态生成的 / 中文首页及完整 Metadata
 * [POS]: app/(zh) 的首页入口，对应站点 canonical 根路由
 * [PROTOCOL]: 变更时更新此头部，然后检查 AGENTS.md
 */
import type { Metadata } from 'next'
import { HomePage } from '@/src/components/HomePage'
import { JsonLd } from '@/src/components/JsonLd'
import { zhHome } from '@/src/data/home'
import { buildMetadata } from '@/src/data/metadata'

export const metadata: Metadata = buildMetadata(zhHome.seo)

export default function Home() {
  return (
    <>
      <JsonLd data={zhHome.seo.jsonLd} />
      <HomePage data={zhHome} />
    </>
  )
}
