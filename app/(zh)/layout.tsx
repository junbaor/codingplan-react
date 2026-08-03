/**
 * [INPUT]: 依赖全局样式、站点脚本、统计客户端岛与共享 Metadata 配置
 * [OUTPUT]: 对外提供中文路由的 zh-CN 根文档布局
 * [POS]: app/(zh) 的根布局，承载中文首页与全部套餐详情页
 * [PROTOCOL]: 变更时更新此头部，然后检查 AGENTS.md
 */
import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import { Analytics } from '@/src/components/Analytics'
import { SiteScripts } from '@/src/components/SiteScripts'
import { baseMetadata, baseViewport } from '@/src/data/metadata'
import '@/src/styles/global.css'

export const metadata: Metadata = baseMetadata
export const viewport: Viewport = baseViewport

export default function ChineseRootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&family=Manrope:wght@400;500;600;700;800&family=Noto+Sans+SC:wght@400;500;700;900&display=swap" rel="stylesheet" />
      </head>
      <body>
        <SiteScripts />
        <Analytics />
        {children}
      </body>
    </html>
  )
}
