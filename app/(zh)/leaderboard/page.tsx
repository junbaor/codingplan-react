/**
 * [INPUT]: 依赖 Next.js 静态参数/404 能力、ArticlePage、JsonLd 与 leaderboardPage 数据
 * [OUTPUT]: 对外提供静态生成的 /leaderboard 性价比榜单页及完整 Metadata
 * [POS]: app/(zh) 的榜单意图入口，服务端直出全量表格（区别于竞品 JS 渲染）
 * [PROTOCOL]: 变更时更新此头部，然后检查 AGENTS.md
 */
import type { Metadata } from 'next'
import { ArticlePage } from '@/src/components/ArticlePage'
import { JsonLd } from '@/src/components/JsonLd'
import { buildMetadata } from '@/src/data/metadata'
import { leaderboardPage } from '@/src/data/leaderboard'

export const metadata: Metadata = buildMetadata(leaderboardPage.seo)

export default function Leaderboard() {
  return (
    <>
      <JsonLd data={leaderboardPage.seo.jsonLd} />
      <ArticlePage page={leaderboardPage} />
    </>
  )
}
