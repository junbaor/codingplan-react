/**
 * [INPUT]: 依赖全局样式、站点脚本、统计客户端岛、共享 Metadata 配置与 WebSite/Organization 站点级 JSON-LD
 * [OUTPUT]: 对外提供中文路由的 zh-CN 根文档布局（含站点级结构化数据与数据更新日期）
 * [POS]: app/(zh) 的根布局，承载中文首页与全部套餐详情页
 * [PROTOCOL]: 变更时更新此头部，然后检查 AGENTS.md
 */
import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import { JetBrains_Mono, Manrope, Noto_Sans_SC } from 'next/font/google'
import { Analytics } from '@/src/components/Analytics'
import { AntiPiracy } from '@/src/components/AntiPiracy'
import { AntiPiracyComment } from '@/src/components/AntiPiracyComment'
import { JsonLd } from '@/src/components/JsonLd'
import { SiteScripts } from '@/src/components/SiteScripts'
import { baseMetadata, baseViewport } from '@/src/data/metadata'
import { buildSiteJsonLd } from '@/src/data/seo'
import '@/src/styles/global.css'

const manrope = Manrope({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], variable: '--font-manrope' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '600', '700'], variable: '--font-jetbrains-mono' })
const notoSansSC = Noto_Sans_SC({ weight: ['400', '500', '700', '900'], variable: '--font-noto-sans-sc', preload: false })

export const metadata: Metadata = baseMetadata
export const viewport: Viewport = baseViewport

export default function ChineseRootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="zh-CN" className={`${manrope.variable} ${jetbrainsMono.variable} ${notoSansSC.variable}`} suppressHydrationWarning>
      <head>
        <AntiPiracyComment />
      </head>
      <body>
        <AntiPiracy />
        <SiteScripts />
        <Analytics />
        <JsonLd data={buildSiteJsonLd('zh-CN')} />
        {children}
      </body>
    </html>
  )
}
