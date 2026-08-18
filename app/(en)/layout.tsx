/**
 * [INPUT]: 依赖全局样式、站点脚本、统计客户端岛、共享 Metadata 配置与 WebSite/Organization 站点级 JSON-LD
 * [OUTPUT]: 对外提供英文路由的 en 根文档布局（含站点级结构化数据）
 * [POS]: app/(en) 的根布局，隔离 /en 的文档语言与中文路由
 * [PROTOCOL]: 变更时更新此头部，然后检查 AGENTS.md
 */
import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import { Analytics } from '@/src/components/Analytics'
import { AntiPiracy } from '@/src/components/AntiPiracy'
import { AntiPiracyComment } from '@/src/components/AntiPiracyComment'
import { JsonLd } from '@/src/components/JsonLd'
import { SiteScripts } from '@/src/components/SiteScripts'
import { baseMetadata, baseViewport } from '@/src/data/metadata'
import { buildSiteJsonLd } from '@/src/data/seo'
import '@/src/styles/global.css'

export const metadata: Metadata = baseMetadata
export const viewport: Viewport = baseViewport

export default function EnglishRootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&family=Manrope:wght@400;500;600;700;800&family=Noto+Sans+SC:wght@400;500;700;900&display=swap" rel="stylesheet" />
        <AntiPiracyComment />
      </head>
      <body>
        <AntiPiracy />
        <SiteScripts />
        <Analytics />
        <JsonLd data={buildSiteJsonLd('en')} />
        <div className="sticky top-16 z-40 border-b border-brand-cyan/20 bg-brand-cyan/10 py-2">
          <p className="page-shell text-center text-xs text-ink-soft sm:text-sm">
            Need a China coding plan (GLM / MiniMax / Kimi / Volcengine / Xiaomi)? Email me at{' '}
            <a className="focus-ring font-bold text-brand-cyan underline underline-offset-2 hover:text-ink" href="mailto:support@codingplan.org">support@codingplan.org</a>
          </p>
        </div>
        {children}
      </body>
    </html>
  )
}
