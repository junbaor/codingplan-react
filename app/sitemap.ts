/**
 * [INPUT]: 依赖 Next.js MetadataRoute 类型、全部公开套餐 slug 与 site-version 的 DATA_UPDATED_AT
 * [OUTPUT]: 对外提供首页、英文页和套餐详情页的 /sitemap.xml，lastmod 与全站数据更新日期同源
 * [POS]: app 的站点地图入口，与静态生成路由共用 planSlugs 数据源
 * [PROTOCOL]: 变更时更新此头部，然后检查 AGENTS.md
 */
import type { MetadataRoute } from 'next'
import { planSlugs, plansBySlug } from '@/src/data/plans'
import { enPlanSlugs, getEnPlan } from '@/src/data/plans-en'
import { DATA_UPDATED_AT, siteUrl } from '@/src/data/site-version'

const lastModified = new Date(DATA_UPDATED_AT)

function languagesOf(alternates?: Array<{ lang: string; href: string }>) {
  if (!alternates) return undefined
  return Object.fromEntries(alternates.map((alternate) => [alternate.lang, alternate.href]))
}

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
      alternates: { languages: languagesOf(plansBySlug[slug].seo.alternates) },
    })),
    ...enPlanSlugs.map((slug) => ({
      url: `${siteUrl}/en/plans/${slug}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
      alternates: { languages: languagesOf(getEnPlan(slug)?.seo.alternates) },
    })),
    {
      url: `${siteUrl}/deepseek-harness-plgins`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${siteUrl}/deepseek-hermes`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ]
}
