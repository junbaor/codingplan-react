/**
 * [INPUT]: 依赖 Next.js MetadataRoute 类型与全部公开套餐 slug
 * [OUTPUT]: 对外提供首页、英文页和套餐详情页的 /sitemap.xml
 * [POS]: app 的站点地图入口，与静态生成路由共用 planSlugs 数据源
 * [PROTOCOL]: 变更时更新此头部，然后检查 AGENTS.md
 */
import type { MetadataRoute } from 'next'
import { planSlugs } from '@/src/data/plans'
import { enPlanSlugs } from '@/src/data/plans-en'

const siteUrl = 'https://codingplan.org'
const lastModified = new Date('2026-08-11')

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
      alternates: { languages: { 'zh-CN': siteUrl, en: `${siteUrl}/en`, 'x-default': siteUrl } },
    },
    {
      url: `${siteUrl}/en`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: { languages: { en: `${siteUrl}/en`, 'zh-CN': siteUrl, 'x-default': siteUrl } },
    },
    ...planSlugs.map((slug) => ({
      url: `${siteUrl}/plans/${slug}`,
      lastModified,
      changeFrequency: slug === 'tencentcloud' ? 'yearly' as const : 'weekly' as const,
      priority: slug === 'tencentcloud' ? 0.4 : slug === 'baiyunzhisuan' ? 0.7 : 0.8,
    })),
    ...enPlanSlugs.map((slug) => ({
      url: `${siteUrl}/en/plans/${slug}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
  ]
}
