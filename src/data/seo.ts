/**
 * [INPUT]: 依赖 types 的 FAQ、平台和详情页领域类型，依赖 site-version 的 DATA_UPDATED_AT/siteUrl
 * [OUTPUT]: 对外提供首页与详情页 JSON-LD 构造函数，以及 WebSite/Organization 站点级与 Article 文章级 schema
 * [POS]: data 的 SEO 适配层，让可见内容与结构化数据使用同一数据源，日期信号统一取自 site-version
 * [PROTOCOL]: 变更时更新此头部，然后检查 AGENTS.md
 */
import type { ContentPageData, FaqItem, PlatformSummary, PlanPageData } from '../types'
import { DATA_UPDATED_AT, siteUrl } from './site-version'

const organization = {
  '@type': 'Organization',
  name: 'CodingPlan.org',
  url: siteUrl,
}

export function buildSiteJsonLd(locale: 'zh-CN' | 'en') {
  const isEn = locale === 'en'
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'CodingPlan.org',
      alternateName: isEn ? 'AI Coding Plan Comparison' : 'AI 编程套餐对比',
      url: isEn ? `${siteUrl}/en` : siteUrl,
      inLanguage: locale,
      publisher: organization,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'CodingPlan.org',
      url: siteUrl,
      logo: `${siteUrl}/og/default.png`,
    },
  ]
}

export function buildArticleJsonLd(options: {
  title: string
  description: string
  url: string
  locale: string
  datePublished: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: options.title,
    description: options.description,
    mainEntityOfPage: options.url,
    url: options.url,
    inLanguage: options.locale,
    image: `${siteUrl}/og/default.png`,
    datePublished: options.datePublished,
    dateModified: DATA_UPDATED_AT,
    author: organization,
    publisher: organization,
  }
}

export function buildFaqJsonLd(faqs: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }
}

export function buildHomeJsonLd(
  title: string,
  description: string,
  url: string,
  language: string,
  platforms: PlatformSummary[],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url,
    inLanguage: language,
    dateModified: DATA_UPDATED_AT,
    publisher: organization,
    mainEntity: {
      '@type': 'ItemList',
      name: language === 'en' ? 'AI Coding Plan Comparison' : 'AI 编程套餐对比',
      numberOfItems: platforms.length,
      itemListElement: platforms.map((platform, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: platform.name,
        url: platform.cta.detailHref
          ? `https://codingplan.org${platform.cta.detailHref}`
          : platform.cta.href,
      })),
    },
  }
}

export function buildPlanJsonLd(plan: PlanPageData) {
  const isEn = plan.seo.locale === 'en'
  const planTitle = `${plan.hero.title} ${plan.hero.highlight}`
  const publishedAt = plan.seo.publishedAt ?? (isEn ? '2026-08-11' : '2026-08-03')
  const providers: Record<string, string> = {
    zhipu: '智谱 AI', minimax: 'MiniMax', kimi: 'Moonshot AI', volcengine: '火山引擎',
    aliyun: '阿里云', tencentcloud: '腾讯云', xiaomi: '小米', baiyunzhisuan: '白云智算',
    'opencode-go': 'Anomaly', claude: 'Anthropic', glm: 'Zhipu AI (Z.ai)', qwen: 'Alibaba Cloud',
  }
  const primaryEntity = plan.slug === 'baiyunzhisuan'
    ? {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: planTitle,
        description: plan.seo.description,
        url: plan.seo.canonical,
        provider: { '@type': 'Organization', name: providers[plan.slug] },
        serviceType: isEn ? 'Pay-as-you-go LLM API' : '按量计费大模型 API',
      }
    : {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: planTitle,
        description: plan.seo.description,
        url: plan.seo.canonical,
        brand: { '@type': 'Brand', name: providers[plan.slug] },
        offers: plan.plans.map((item) => ({
          '@type': 'Offer',
          name: item.name,
          url: plan.purchaseUrl,
          priceCurrency: isEn ? 'USD' : 'CNY',
          price: item.price.replace(/[^\d.]/g, '') || '0',
          availability:
            item.disabled || plan.availability === 'discontinued' || plan.availability === 'archived'
              ? 'https://schema.org/Discontinued'
              : plan.availability === 'limited'
                ? 'https://schema.org/LimitedAvailability'
                : 'https://schema.org/InStock',
        })),
      }
  const hubUrl = isEn ? `${siteUrl}/en` : `${siteUrl}/#platforms`
  return [
    primaryEntity,
    buildArticleJsonLd({ title: planTitle, description: plan.seo.description, url: plan.seo.canonical, locale: plan.seo.locale, datePublished: publishedAt }),
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'CodingPlan.org', item: siteUrl },
        { '@type': 'ListItem', position: 2, name: isEn ? 'Coding Plans' : '全部套餐', item: hubUrl },
        { '@type': 'ListItem', position: 3, name: planTitle, item: plan.seo.canonical },
      ],
    },
    buildFaqJsonLd(plan.faqs),
  ]
}

const contentHubNames: Record<string, string> = {
  blogs: '博客',
  agents: '智能体',
  models: '模型',
  deals: '优惠与邀请码',
  changelog: '变更记录',
  leaderboard: '性价比榜',
}

export function buildContentJsonLd(page: ContentPageData) {
  const isEn = page.seo.locale === 'en'
  const title = `${page.hero.title}${page.hero.highlight ? ` ${page.hero.highlight}` : ''}`
  const path = new URL(page.seo.canonical).pathname
  const segments = path.split('/').filter(Boolean)
  const isEnPath = segments[0] === 'en'
  const hubSegment = (isEnPath ? segments[1] : segments[0]) ?? ''
  const hubName = isEn ? enContentHubNames[hubSegment] : contentHubNames[hubSegment] ?? '内容'
  const hubPath = isEnPath ? `/en/${hubSegment}` : `/${hubSegment}`
  const isHubPage = segments.length === (isEnPath ? 2 : 1)
  const breadcrumbItems = [
    { '@type': 'ListItem', position: 1, name: 'CodingPlan.org', item: siteUrl },
    ...(isHubPage ? [] : [{ '@type': 'ListItem', position: 2, name: hubName, item: `${siteUrl}${hubPath}` }]),
    { '@type': 'ListItem', position: isHubPage ? 2 : 3, name: title, item: page.seo.canonical },
  ]
  const jsonLd: Record<string, unknown>[] = [
    buildArticleJsonLd({ title, description: page.seo.description, url: page.seo.canonical, locale: page.seo.locale, datePublished: DATA_UPDATED_AT }),
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: breadcrumbItems },
    buildFaqJsonLd(page.faqs),
  ]
  if (page.hubItems?.length) {
    jsonLd.push({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: page.hubTitle ?? title,
      numberOfItems: page.hubItems.length,
      itemListElement: page.hubItems.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.title,
        url: item.href.startsWith('http') ? item.href : `${siteUrl}${item.href}`,
      })),
    })
  }
  return jsonLd
}

const enContentHubNames: Record<string, string> = {
  blogs: 'Blog',
  plans: 'Coding Plans',
  tools: 'Tools',
  models: 'Models',
}
