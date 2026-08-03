/**
 * [INPUT]: 依赖 types 的 FAQ、平台和详情页领域类型
 * [OUTPUT]: 对外提供首页与详情页 JSON-LD 构造函数
 * [POS]: data 的 SEO 适配层，让可见内容与结构化数据使用同一数据源
 * [PROTOCOL]: 变更时更新此头部，然后检查 AGENTS.md
 */
import type { FaqItem, PlatformSummary, PlanPageData } from '../types'

const organization = {
  '@type': 'Organization',
  name: 'CodingPlan.org',
  url: 'https://codingplan.org',
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
    dateModified: '2026-08-03',
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
  const providers: Record<string, string> = {
    zhipu: '智谱 AI', minimax: 'MiniMax', kimi: 'Moonshot AI', volcengine: '火山引擎',
    aliyun: '阿里云', tencentcloud: '腾讯云', xiaomi: '小米', baiyunzhisuan: '白云智算',
  }
  const primaryEntity = plan.slug === 'baiyunzhisuan'
    ? {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: `${plan.hero.title} ${plan.hero.highlight}`,
        description: plan.seo.description,
        url: plan.seo.canonical,
        provider: { '@type': 'Organization', name: providers[plan.slug] },
        serviceType: '按量计费大模型 API',
      }
    : {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: `${plan.hero.title} ${plan.hero.highlight}`,
        description: plan.seo.description,
        url: plan.seo.canonical,
        brand: { '@type': 'Brand', name: providers[plan.slug] },
        offers: plan.plans.map((item) => ({
          '@type': 'Offer',
          name: item.name,
          url: plan.purchaseUrl,
          priceCurrency: 'CNY',
          price: item.price.replace(/[^\d.]/g, '') || '0',
          availability:
            item.disabled || plan.availability === 'discontinued' || plan.availability === 'archived'
              ? 'https://schema.org/Discontinued'
              : plan.availability === 'limited'
                ? 'https://schema.org/LimitedAvailability'
                : 'https://schema.org/InStock',
        })),
      }
  return [
    primaryEntity,
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'CodingPlan.org', item: 'https://codingplan.org' },
        { '@type': 'ListItem', position: 2, name: `${plan.hero.title} ${plan.hero.highlight}`, item: plan.seo.canonical },
      ],
    },
    buildFaqJsonLd(plan.faqs),
  ]
}
