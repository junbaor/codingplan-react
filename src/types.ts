/**
 * [INPUT]: 无运行时依赖，承载原站内容抽取后的领域约束
 * [OUTPUT]: 对外提供首页、平台详情、内容顺序、标题层级、套餐、FAQ 与 SEO 类型
 * [POS]: src 的领域模型，被 data、components 和 app 共同依赖
 * [PROTOCOL]: 变更时更新此头部，然后检查 AGENTS.md
 */
export type Locale = 'zh-CN' | 'en'
export type Accent = 'cyan' | 'green' | 'orange' | 'purple' | 'blue' | 'red' | 'slate'
export type Availability = 'active' | 'limited' | 'discontinued' | 'archived'

export interface SeoData {
  title: string
  description: string
  canonical: string
  locale: Locale
  ogType?: 'website' | 'article'
  alternates?: Array<{ lang: string; href: string }>
  publishedAt?: string
  jsonLd: Record<string, unknown>[]
}

export interface FaqItem {
  question: string
  answer: string
}

export interface StatItem {
  value: string
  label: string
}

export interface PlanSummary {
  name: string
  badge?: string
  price: string
  unit?: string
  note?: string
  details: string[]
  featured?: boolean
  disabled?: boolean
}

export interface PlatformSummary {
  id: string
  name: string
  heading: string
  subtitle: string
  accent: Accent
  models: string[]
  entryPrice: string
  quota: string
  plans: PlanSummary[]
  tools: string[]
  features: string[]
  cta: { label: string; href?: string; detailHref?: string; contact?: boolean; disabled?: boolean }
  availability?: Availability
  recommended?: boolean
  specialBadge?: string
}

export interface HomePageData {
  locale: Locale
  seo: SeoData
  nav: { compare: string; platforms: string; faq: string; language: string; languageHref: string }
  hero: { badge: string; title: string; highlight: string; description: string; stats: StatItem[] }
  comparison: { title: string; description: string; columns: string[] }
  platformsTitle: string
  platformsDescription: string
  platforms: PlatformSummary[]
  faqTitle: string
  faqs: FaqItem[]
  promotion: { eyebrow: string; title: string; description: string; features: string[]; cta: string }
  footerDisclaimer: string
}

export interface ModelInfo {
  icon: string
  name: string
  description: string
  badge?: string
}

export interface DetailPlan {
  name: string
  badge?: string
  price: string
  unit: string
  discount?: string
  features: string[]
  audience: string
  ctaLabel?: string
  featured?: boolean
  disabled?: boolean
  recommended?: boolean
}

export interface FeatureCard {
  icon?: string
  title: string
  description: string
}

export interface FeatureSection {
  title: string
  description?: string
  headingLevel?: 2 | 3
  cardHeadings?: boolean
  cards?: FeatureCard[]
  highlights?: string[]
  warning?: string
}

export interface ComparisonTable {
  title: string
  description?: string
  columns: string[]
  rows: string[][]
  featuredColumn?: number
}

export interface PlanPageData {
  slug: string
  seo: SeoData
  accent: Accent
  availability: Availability
  hero: { badge: string; title: string; highlight: string; description: string; stats: StatItem[] }
  modelsTitle: string
  modelsDescription?: string
  models: ModelInfo[]
  plansTitle: string
  plansDescription?: string
  plans: DetailPlan[]
  purchaseUrl?: string
  sections: FeatureSection[]
  comparison?: ComparisonTable
  tools: string[]
  toolsTitle?: string
  contentOrder?: Array<'models' | 'plans' | 'comparison' | 'tools' | 'faq' | 'final-cta' | `section:${number}`>
  finalCta?: { title: string; label: string; href: string }
  faqs: FaqItem[]
}
