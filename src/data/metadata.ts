/**
 * [INPUT]: 依赖 Next.js Metadata/Viewport 类型、types.SeoData 页面元数据与 site-version 的 siteUrl
 * [OUTPUT]: 对外提供全站基础 Metadata（含 og:image/twitter 大卡）、Viewport 与页面 Metadata 转换函数
 * [POS]: data 的 Next.js SEO 适配层，将框架无关 SEO 数据投影到 App Router
 * [PROTOCOL]: 变更时更新此头部，然后检查 AGENTS.md
 */
import type { Metadata, Viewport } from 'next'
import type { SeoData } from '../types'
import { siteUrl } from './site-version'

const ogImage = {
  url: '/og/default.png',
  width: 1200,
  height: 630,
  alt: 'CodingPlan.org — AI Coding Plan 对比',
}

export const baseMetadata = {
  metadataBase: new URL(siteUrl),
  applicationName: 'CodingPlan.org',
  authors: [{ name: 'codingplan.org', url: siteUrl }],
  creator: 'codingplan.org',
  publisher: 'codingplan.org',
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='90'%3E%F0%9F%8C%90%3C/text%3E%3C/svg%3E",
  },
} satisfies Metadata

export const baseViewport = {
  colorScheme: 'light dark',
  themeColor: '#06080d',
} satisfies Viewport

export function buildMetadata(seo: SeoData): Metadata {
  const languages = seo.alternates
    ? Object.fromEntries(seo.alternates.map((alternate) => [alternate.lang, alternate.href]))
    : undefined

  return {
    title: seo.title,
    description: seo.description,
    robots: { index: true, follow: true },
    alternates: { canonical: seo.canonical, languages },
    openGraph: {
      title: seo.title,
      description: seo.description,
      type: seo.ogType ?? 'website',
      url: seo.canonical,
      siteName: 'CodingPlan.org',
      locale: seo.locale === 'en' ? 'en_US' : 'zh_CN',
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: ['/og/default.png'],
    },
  }
}
