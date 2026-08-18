/**
 * [INPUT]: 依赖 plans 与 plans-en 的 slug 清单
 * [OUTPUT]: 对外提供 zh↔en 跨语言等效套餐 slug 映射与 alternates 构造器
 * [POS]: data 的国际化 SEO 映射层，供 plans/plans-en/sitemap 统一引用
 * [PROTOCOL]: 变更时更新此头部，然后检查 AGENTS.md
 */
import { siteUrl } from './site-version'

/** zh slug → en slug（双向等效），未列出的 slug 无跨语言等效页 */
const zhToEn: Record<string, string> = {
  zhipu: 'glm',
  aliyun: 'qwen',
  minimax: 'minimax',
  kimi: 'kimi',
  'opencode-go': 'opencode-go',
}

export function zhPlanAlternates(slug: string) {
  const en = zhToEn[slug]
  const entries: Array<{ lang: string; href: string }> = [
    { lang: 'zh-CN', href: `${siteUrl}/plans/${slug}` },
  ]
  if (en) entries.push({ lang: 'en', href: `${siteUrl}/en/plans/${en}` })
  entries.push({ lang: 'x-default', href: en ? `${siteUrl}/plans/${slug}` : siteUrl })
  return entries
}

export function enPlanAlternates(slug: string) {
  const zh = Object.entries(zhToEn).find(([, enSlug]) => enSlug === slug)?.[0]
  const entries: Array<{ lang: string; href: string }> = [
    { lang: 'en', href: `${siteUrl}/en/plans/${slug}` },
  ]
  if (zh) entries.push({ lang: 'zh-CN', href: `${siteUrl}/plans/${zh}` })
  entries.push({ lang: 'x-default', href: zh ? `${siteUrl}/en/plans/${slug}` : `${siteUrl}/en` })
  return entries
}
